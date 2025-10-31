# PinShip - Hong Kong Local Shipping App

PinShip is a mobile application designed for consumers to ship physical stocks with a focus on Hong Kong local shipments. The app provides real-time tracking, multiple shipping options, and a user-friendly interface.

## Features

### Home Tab
- **Shipment Tracking Grid**: View all your active and completed shipments
- **Search Functionality**: Search shipments by ID or destination
- **Real-time Status Updates**: Track shipment progress with visual indicators
- **Detailed Shipment View**:
  - GEO map tracking with route visualization
  - Status timeline with timestamps
  - Manager information
  - Live chat with customer service

### Ship Tab
- **Local Shipping** (Available):
  - Pin-ship (3-7 days) - Economic option
  - Speed Post (1-3 days) - Express delivery
- **Overseas Shipping** (Coming Soon)

### Profile Tab
- **User Settings**:
  - Change avatar (camera/gallery)
  - Language selection (English, 中文, 繁體中文)
  - Theme toggle (Light/Dark mode)
  - Billing ID management
  - Logout functionality

## Technical Stack

- **Framework**: React Native 0.72.7
- **Navigation**: React Navigation 6
- **Maps**: React Native Maps
- **Storage**: AsyncStorage
- **Icons**: React Native Vector Icons
- **Image Handling**: React Native Image Picker

## Brand Identity
- **Primary Color**: #f20c00 (PinShip Red)
- **App Name**: PinShip
- **Version**: 1.0.0

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. For Android:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

4. Run the app:
   ```bash
   npm run android
   ```

## Configuration

### Google Maps API Key
To use the map functionality, you need to add your Google Maps API key:

1. Get an API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Maps SDK for Android
3. Add your API key in `android/app/src/main/AndroidManifest.xml`:
   ```xml
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="YOUR_API_KEY_HERE"/>
   ```

## Build for Production

To create a release APK:

```bash
cd android
./gradlew assembleRelease
```

The APK will be generated at:
`android/app/build/outputs/apk/release/app-release.apk`

## Project Structure

```
PinShip/
├── android/                 # Android specific files
├── src/
│   ├── components/          # Reusable components
│   │   ├── ShipmentDetailModal.js
│   │   └── LocalShippingModal.js
│   ├── context/            # Context providers
│   │   └── ThemeContext.js
│   ├── screens/            # App screens
│   │   ├── HomeScreen.js
│   │   ├── ShipScreen.js
│   │   └── ProfileScreen.js
│   └── styles/             # Style definitions
│       └── colors.js
├── App.js                  # Main app component
├── index.js                # App entry point
└── package.json            # Dependencies
```

## Features Roadmap

- [ ] Push notifications for shipment updates
- [ ] Barcode/QR code scanning
- [ ] Payment integration
- [ ] Shipment history export
- [ ] Multi-language support implementation
- [ ] Overseas shipping
- [ ] Package insurance options
- [ ] Scheduled pickups

## License

© 2024 PinShip. All rights reserved.