#!/bin/bash

echo "======================================"
echo "      PinShip App Setup Script        "
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check if Android SDK is installed
if [ -z "$ANDROID_HOME" ]; then
    echo ""
    echo "⚠️  Warning: ANDROID_HOME is not set."
    echo "   Please set up Android SDK to build the Android app."
    echo "   You can still run the app in a simulator if you have Android Studio installed."
fi

# Create Android local.properties file if it doesn't exist
if [ ! -f "android/local.properties" ] && [ ! -z "$ANDROID_HOME" ]; then
    echo "sdk.dir=$ANDROID_HOME" > android/local.properties
    echo "✅ Created android/local.properties"
fi

echo ""
echo "======================================"
echo "        Setup Complete!               "
echo "======================================"
echo ""
echo "Next steps:"
echo ""
echo "1. To run on Android:"
echo "   npm run android"
echo ""
echo "2. Add your Google Maps API key:"
echo "   Edit android/app/src/main/AndroidManifest.xml"
echo "   Replace 'YOUR_GOOGLE_MAPS_API_KEY_HERE' with your actual key"
echo ""
echo "3. For production build:"
echo "   cd android && ./gradlew assembleRelease"
echo ""
echo "Happy shipping with PinShip! 📦"