#!/bin/bash

echo "======================================"
echo "      PinShip App Runner              "
echo "======================================"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "⚠️  Warning: node_modules not found."
    echo "Attempting to install dependencies..."
    echo ""

    # Try with different registries if main one fails
    echo "Trying with npm default registry..."
    npm install --legacy-peer-deps || {
        echo "Failed with default registry. Trying taobao mirror..."
        npm install --legacy-peer-deps --registry https://registry.npmmirror.com || {
            echo "Failed with taobao mirror. Trying yarn if available..."
            if command_exists yarn; then
                yarn install --ignore-engines
            else
                echo "❌ Unable to install dependencies due to network issues."
                echo "Please try:"
                echo "1. Check your internet connection"
                echo "2. Try using a VPN"
                echo "3. Install dependencies manually with: npm install --legacy-peer-deps"
                exit 1
            fi
        }
    }
fi

# Check if React Native CLI is available
if ! command_exists react-native; then
    echo "Installing React Native CLI locally..."
    npx --yes react-native@latest --version
fi

# Start Metro in background
echo ""
echo "Starting Metro bundler..."
npx react-native start --reset-cache &
METRO_PID=$!

# Wait for Metro to start
echo "Waiting for Metro to initialize..."
sleep 5

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Stopping Metro bundler..."
    kill $METRO_PID 2>/dev/null
    exit
}

# Set up trap to cleanup on script exit
trap cleanup EXIT INT TERM

# Check for connected devices or emulators
echo ""
echo "Checking for Android devices..."
adb devices -l

echo ""
echo "======================================"
echo "Choose an option:"
echo "1. Run on Android device/emulator"
echo "2. Build APK only"
echo "3. Start Metro bundler only"
echo "======================================"
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo "Running on Android..."
        npx react-native run-android
        ;;
    2)
        echo "Building APK..."
        cd android
        ./gradlew assembleDebug
        echo ""
        if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
            echo "✅ APK built successfully!"
            echo "Location: $(pwd)/app/build/outputs/apk/debug/app-debug.apk"
        else
            echo "❌ APK build failed"
        fi
        cd ..
        ;;
    3)
        echo "Metro bundler is running..."
        echo "Press Ctrl+C to stop"
        wait $METRO_PID
        ;;
    *)
        echo "Invalid choice"
        ;;
esac

echo ""
echo "======================================"
echo "App session complete"
echo "======================================"