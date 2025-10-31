#!/bin/bash

echo "======================================"
echo "  Gradle Manual Download Helper"
echo "======================================"
echo ""

GRADLE_VERSION="7.5.1"
GRADLE_DIST_URL="https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-all.zip"
GRADLE_HOME="$HOME/.gradle/wrapper/dists/gradle-${GRADLE_VERSION}-all"
GRADLE_HASH="8qvcp4xpdhf22g3h5qh79v1ca"
GRADLE_DIR="$GRADLE_HOME/$GRADLE_HASH"

echo "This script will help you download Gradle manually"
echo ""

# Create directory
echo "Creating directory: $GRADLE_DIR"
mkdir -p "$GRADLE_DIR"

# Option 1: Try with curl
echo ""
echo "Attempting download with curl (5 minute timeout)..."
if curl -L --connect-timeout 300 --max-time 300 -o "$GRADLE_DIR/gradle-${GRADLE_VERSION}-all.zip" "$GRADLE_DIST_URL"; then
    echo "✅ Download successful with curl!"
else
    echo "❌ curl failed. Trying wget..."

    # Option 2: Try with wget
    if command -v wget >/dev/null 2>&1; then
        if wget --timeout=300 --tries=3 -O "$GRADLE_DIR/gradle-${GRADLE_VERSION}-all.zip" "$GRADLE_DIST_URL"; then
            echo "✅ Download successful with wget!"
        else
            echo "❌ wget also failed."
        fi
    else
        echo "wget not installed"
    fi
fi

# Check if file was downloaded
if [ -f "$GRADLE_DIR/gradle-${GRADLE_VERSION}-all.zip" ]; then
    FILE_SIZE=$(ls -lh "$GRADLE_DIR/gradle-${GRADLE_VERSION}-all.zip" | awk '{print $5}')
    echo ""
    echo "✅ Gradle downloaded successfully!"
    echo "File size: $FILE_SIZE"
    echo "Location: $GRADLE_DIR/gradle-${GRADLE_VERSION}-all.zip"

    # Extract the zip
    echo ""
    echo "Extracting Gradle..."
    cd "$GRADLE_DIR"
    unzip -q "gradle-${GRADLE_VERSION}-all.zip"

    if [ -d "gradle-${GRADLE_VERSION}" ]; then
        echo "✅ Gradle extracted successfully!"
        echo ""
        echo "Now you can run:"
        echo "  cd /Users/Krus/App/mobile/anyship"
        echo "  npx react-native run-android"
    else
        echo "❌ Failed to extract Gradle"
    fi
else
    echo ""
    echo "❌ Failed to download Gradle"
    echo ""
    echo "Alternative options:"
    echo ""
    echo "1. Download manually from browser:"
    echo "   URL: $GRADLE_DIST_URL"
    echo "   Save to: $GRADLE_DIR/gradle-${GRADLE_VERSION}-all.zip"
    echo ""
    echo "2. Try a mirror (e.g., from China):"
    echo "   https://mirrors.cloud.tencent.com/gradle/gradle-${GRADLE_VERSION}-all.zip"
    echo ""
    echo "3. Use Android Studio to download it automatically"
    echo ""
    echo "4. Try on a different network or with VPN"
fi