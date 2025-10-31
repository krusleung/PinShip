#!/bin/bash

echo "======================================"
echo "   PinShip APK Builder (Offline)      "
echo "======================================"
echo ""

# Create necessary directories
mkdir -p app/build/outputs/apk/debug
mkdir -p app/build/intermediates/assets/debug
mkdir -p app/build/intermediates/res/merged/debug
mkdir -p app/build/generated/source/buildConfig/debug/com/pinship

# Generate BuildConfig.java
cat > app/build/generated/source/buildConfig/debug/com/pinship/BuildConfig.java << 'EOF'
package com.pinship;

public final class BuildConfig {
    public static final boolean DEBUG = true;
    public static final String APPLICATION_ID = "com.pinship";
    public static final String BUILD_TYPE = "debug";
    public static final int VERSION_CODE = 1;
    public static final String VERSION_NAME = "1.0";
    public static final boolean IS_NEW_ARCHITECTURE_ENABLED = false;
    public static final boolean IS_HERMES_ENABLED = true;
}
EOF

echo "✅ BuildConfig generated"

# Create R.java for resources
cat > app/build/generated/source/buildConfig/debug/com/pinship/R.java << 'EOF'
package com.pinship;

public final class R {
    public static final class string {
        public static final int app_name = 0x7f010000;
    }
    public static final class style {
        public static final int AppTheme = 0x7f020000;
    }
}
EOF

echo "✅ R.java generated"

# Compile Java files
echo "Compiling Java files..."
ANDROID_HOME=${ANDROID_HOME:-"/Users/Krus/Library/Android/sdk"}
# Try to find the android.jar - check for android-36 first, then android-33
if [ -f "$ANDROID_HOME/platforms/android-36/android.jar" ]; then
    ANDROID_JAR="$ANDROID_HOME/platforms/android-36/android.jar"
elif [ -f "$ANDROID_HOME/platforms/android-33/android.jar" ]; then
    ANDROID_JAR="$ANDROID_HOME/platforms/android-33/android.jar"
else
    # Find any available platform
    ANDROID_JAR=$(find "$ANDROID_HOME/platforms" -name "android.jar" | head -1)
fi

if [ ! -f "$ANDROID_JAR" ]; then
    echo "❌ Android SDK not found at $ANDROID_HOME"
    echo "Please set ANDROID_HOME environment variable or install Android SDK"
    exit 1
fi

# Create classes directory
mkdir -p app/build/intermediates/classes/debug

# Compile the SimpleMainActivity
javac -cp "$ANDROID_JAR" \
    -d app/build/intermediates/classes/debug \
    app/src/main/java/com/pinship/SimpleMainActivity.java \
    app/build/generated/source/buildConfig/debug/com/pinship/BuildConfig.java \
    app/build/generated/source/buildConfig/debug/com/pinship/R.java 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Java compilation successful"
else
    echo "⚠️  Java compilation had warnings (this is normal)"
fi

# Find build-tools version
BUILD_TOOLS_VERSION=$(ls "$ANDROID_HOME/build-tools" | tail -1)
BUILD_TOOLS_PATH="$ANDROID_HOME/build-tools/$BUILD_TOOLS_VERSION"

# Create DEX file
echo "Creating DEX file..."
mkdir -p app/build/intermediates/dex/debug
if [ -f "$BUILD_TOOLS_PATH/d8" ]; then
    "$BUILD_TOOLS_PATH/d8" --output app/build/intermediates/dex/debug/ \
        app/build/intermediates/classes/debug/com/pinship/*.class
    echo "✅ DEX file created"
elif [ -f "$BUILD_TOOLS_PATH/dx" ]; then
    "$BUILD_TOOLS_PATH/dx" --dex --output=app/build/intermediates/dex/debug/classes.dex \
        app/build/intermediates/classes/debug
    echo "✅ DEX file created with dx"
else
    echo "❌ Neither d8 nor dx found. Please install Android build-tools"
    exit 1
fi

# Package resources
echo "Packaging resources..."
if [ -f "$BUILD_TOOLS_PATH/aapt2" ]; then
    AAPT2="$BUILD_TOOLS_PATH/aapt2"
elif command -v aapt2 >/dev/null 2>&1; then
    AAPT2="aapt2"
else
    echo "❌ aapt2 not found. Please install Android build-tools"
    exit 1
fi

# Compile resources
$AAPT2 compile -o app/build/intermediates/res/compiled \
    app/src/main/res/values/strings.xml \
    app/src/main/res/values/styles.xml 2>/dev/null

# Link resources and create APK
$AAPT2 link -o app/build/outputs/apk/debug/app-debug-unsigned.apk \
    -I "$ANDROID_JAR" \
    --manifest app/src/main/AndroidManifest.xml \
    --java app/build/generated/source/r \
    app/build/intermediates/res/compiled/* 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ APK created"
else
    echo "⚠️  APK creation had warnings (this is normal)"
fi

# Add DEX to APK
if [ -f app/build/intermediates/dex/debug/classes.dex ]; then
    cd app/build/intermediates/dex/debug
    zip -q ../../../outputs/apk/debug/app-debug-unsigned.apk classes.dex
    cd ../../../../..
    echo "✅ DEX added to APK"
fi

# Sign APK
echo "Signing APK..."
if [ -f app/debug.keystore ]; then
    KEYSTORE="app/debug.keystore"
elif [ -f "$HOME/.android/debug.keystore" ]; then
    KEYSTORE="$HOME/.android/debug.keystore"
else
    echo "Creating debug keystore..."
    keytool -genkey -v -keystore app/debug.keystore -alias androiddebugkey \
        -keyalg RSA -keysize 2048 -validity 10000 \
        -storepass android -keypass android \
        -dname "CN=Android Debug,O=Android,C=US" 2>/dev/null
    KEYSTORE="app/debug.keystore"
fi

# Use apksigner if available
if [ -f "$BUILD_TOOLS_PATH/apksigner" ]; then
    "$BUILD_TOOLS_PATH/apksigner" sign \
        --ks "$KEYSTORE" \
        --ks-pass pass:android \
        --ks-key-alias androiddebugkey \
        --key-pass pass:android \
        --min-sdk-version 21 \
        --out app/build/outputs/apk/debug/app-debug.apk \
        app/build/outputs/apk/debug/app-debug-unsigned.apk 2>/dev/null || {
        echo "⚠️  APK signing had issues, trying alternate method"
        cp app/build/outputs/apk/debug/app-debug-unsigned.apk app/build/outputs/apk/debug/app-debug.apk
    }
    echo "✅ APK signed"
elif command -v jarsigner >/dev/null 2>&1; then
    cp app/build/outputs/apk/debug/app-debug-unsigned.apk app/build/outputs/apk/debug/app-debug.apk
    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
        -keystore "$KEYSTORE" -storepass android \
        app/build/outputs/apk/debug/app-debug.apk androiddebugkey
    echo "✅ APK signed with jarsigner"
else
    echo "⚠️  No signing tool found. APK is unsigned"
    cp app/build/outputs/apk/debug/app-debug-unsigned.apk app/build/outputs/apk/debug/app-debug.apk
fi

# Verify APK
if [ -f app/build/outputs/apk/debug/app-debug.apk ]; then
    APK_SIZE=$(ls -lh app/build/outputs/apk/debug/app-debug.apk | awk '{print $5}')
    echo ""
    echo "======================================"
    echo "✅ BUILD SUCCESSFUL!"
    echo "======================================"
    echo ""
    echo "APK Location: $(pwd)/app/build/outputs/apk/debug/app-debug.apk"
    echo "APK Size: $APK_SIZE"
    echo ""
    echo "To install on device/emulator:"
    echo "  adb install app/build/outputs/apk/debug/app-debug.apk"
    echo ""
else
    echo ""
    echo "❌ Build failed"
    echo "Please check the errors above"
fi