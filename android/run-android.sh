#!/bin/bash

echo "======================================"
echo "  PinShip Android App Runner"
echo "======================================"
echo ""

# Check if gradlew exists
if [ ! -f "./gradlew" ]; then
    echo "❌ gradlew not found"
    exit 1
fi

# Try to use local Gradle if network fails
echo "Attempting to build with React Native..."

# Set environment variables
export ANDROID_HOME=${ANDROID_HOME:-"/Users/Krus/Library/Android/sdk"}

# Create a simple gradle.properties if it doesn't exist
if [ ! -f "gradle.properties" ]; then
    echo "Creating gradle.properties..."
    cat > gradle.properties << 'EOF'
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m
android.useAndroidX=true
android.enableJetifier=true
FLIPPER_VERSION=0.182.0
IS_NEW_ARCHITECTURE_ENABLED=false
IS_HERMES_ENABLED=true
hermesEnabled=true
newArchEnabled=false
reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64
EOF
fi

# Option 1: Try with timeout increase
echo "Attempting build with increased timeout..."
./gradlew assembleDebug --no-daemon -Dorg.gradle.internal.http.connectionTimeout=60000 -Dorg.gradle.internal.http.socketTimeout=60000 &

# Give it 30 seconds to try
GRADLE_PID=$!
sleep 30

# Check if it's still running (likely stuck on download)
if ps -p $GRADLE_PID > /dev/null; then
    echo "Build is taking too long, likely due to network issues."
    kill $GRADLE_PID 2>/dev/null

    echo ""
    echo "======================================"
    echo "Network issue detected. Alternative options:"
    echo "======================================"
    echo ""
    echo "1. Use Android Studio:"
    echo "   - Open Android Studio"
    echo "   - Open the 'android' folder of this project"
    echo "   - Click 'Sync Now' when prompted"
    echo "   - Run the app from Android Studio"
    echo ""
    echo "2. Download Gradle manually:"
    echo "   wget https://services.gradle.org/distributions/gradle-7.5.1-all.zip"
    echo "   mkdir -p ~/.gradle/wrapper/dists/gradle-7.5.1-all"
    echo "   mv gradle-7.5.1-all.zip ~/.gradle/wrapper/dists/gradle-7.5.1-all/"
    echo "   Then run: npx react-native run-android"
    echo ""
    echo "3. Use the simple APK already built:"
    echo "   adb install app/build/outputs/apk/debug/PinShip.apk"
    echo ""
else
    # Build completed
    wait $GRADLE_PID
    if [ $? -eq 0 ]; then
        echo "✅ Build successful!"

        # Check if APK exists
        if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
            echo "Installing APK..."
            adb install app/build/outputs/apk/debug/app-debug.apk
        fi
    else
        echo "❌ Build failed"
    fi
fi