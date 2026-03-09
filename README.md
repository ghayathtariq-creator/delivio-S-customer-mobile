# DEVO-S — All-in-One Delivery Platform

DEVO-S is a React Native (Expo) mobile application that powers a full delivery ecosystem through **five role-based interfaces** in a single app.

---

## 5 Interfaces

| # | Interface | Description |
|---|-----------|-------------|
| 1 | **Admin Panel** | Manage users, restaurants, orders, analytics and platform settings |
| 2 | **Support** | View and manage customer support tickets by status |
| 3 | **Customer** | Browse restaurants & markets, place orders and track them in real time |
| 4 | **Rider** | Accept deliveries, update status, and view earnings |
| 5 | **Restaurant & Market** | Manage incoming orders, menu items and store availability |

On launch the app shows a **role-selection home screen** — tap any card to enter that interface.

---

## App Identity

| Field | Value |
|-------|-------|
| App Name | **DEVO-S** |
| iOS Bundle ID | `com.devos.app` |
| Android Package | `com.devos.app` |
| Version | `1.0.0` |
| iOS Build Number | `1` |
| Android versionCode | `1` |

---

## Tech Stack

- **React Native** (Expo)
- **TypeScript** — strict mode, path aliases (`@screens/*`, `@components/*`, …)
- Lightweight **state-based router** (no external nav library required at this stage)

---

## Project Structure

```
├── App.tsx                        # Root router — maps Screen state to interface
├── app.json                       # Expo config (name, bundle IDs, splash, icons)
├── index.js                       # AppRegistry entry point
└── src/
    ├── components/
    │   ├── Header.tsx             # Branded orange header with optional back button
    │   └── RoleCard.tsx           # Tappable role card used on the home screen
    ├── context/                   # (future) React context providers
    ├── navigation/
    │   └── index.ts               # Screen union type + NavigateFunction
    ├── screens/
    │   ├── HomeScreen.tsx         # Role-selection entry screen
    │   ├── admin/
    │   │   └── AdminDashboardScreen.tsx
    │   ├── support/
    │   │   └── SupportScreen.tsx
    │   ├── customer/
    │   │   └── CustomerHomeScreen.tsx
    │   ├── rider/
    │   │   └── RiderHomeScreen.tsx
    │   └── restaurant/
    │       └── RestaurantScreen.tsx
    ├── services/                  # (future) API service layer
    ├── types/
    │   └── index.ts               # All domain types (User, Order, Rider, Restaurant, …)
    └── utils/                     # (future) helper functions
```

---

## Local Development

### Prerequisites
- Node.js ≥ 16
- Expo CLI: `npm install -g expo-cli`
- For iOS: Xcode + CocoaPods
- For Android: Android Studio + SDK

### Install & Run

```bash
# Clone the repo
git clone https://github.com/ghayathtariq-creator/delivio-S-customer-mobile.git
cd delivio-S-customer-mobile

# Install dependencies
npm install

# Start Expo dev server
npx expo start

# Run on iOS simulator
npm run ios

# Run on Android emulator / device
npm run android
```

---

## Deployment to Google Play & Apple App Store

### 1. Build with EAS (recommended)

```bash
npm install -g eas-cli
eas login
eas build:configure
```

#### Android (Google Play)

```bash
# Production AAB for Google Play
eas build --platform android --profile production
```

Submit to Google Play:
```bash
eas submit --platform android
```

> Make sure you have a **Google Play Developer account** and have created the app in the [Google Play Console](https://play.google.com/console) first.

#### iOS (Apple App Store)

```bash
# Production IPA for App Store
eas build --platform ios --profile production
```

Submit to App Store Connect:
```bash
eas submit --platform ios
```

> Requires an **Apple Developer Program membership** ($99/year) and an app record in [App Store Connect](https://appstoreconnect.apple.com).

### 2. Manual builds (without EAS)

#### Android APK / AAB

```bash
cd android
./gradlew bundleRelease          # AAB for Play Store
./gradlew assembleRelease        # APK for direct install
```

Sign the build using your keystore and upload to the Google Play Console.

#### iOS IPA

```bash
cd ios && pod install && cd ..
```

Open `ios/DEVOS.xcworkspace` in Xcode → set your **Team** and **Bundle Identifier** (`com.devos.app`) → **Product → Archive** → upload via Xcode Organizer.

### `eas.json` example

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "production": {
      "android": { "buildType": "app-bundle" },
      "ios": { "credentialsSource": "remote" }
    }
  }
}
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Open a Pull Request

---

*Happy coding! 🚀*
