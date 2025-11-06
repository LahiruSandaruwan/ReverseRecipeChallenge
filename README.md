# 🍳 Reverse Recipe Challenge - Mobile App

A fun and creative mobile app that generates unique (and sometimes hilariously weird) recipes from random ingredients. Built with React Native and monetized with Google AdMob.

## 📱 Features

- **Creative Recipe Generation**: Turn any combination of ingredients into creative recipes
- **Difficulty Levels**: Choose between Easy, Medium, and Hard recipes
- **Weirdness Factor**: Each recipe gets a weirdness rating for entertainment
- **Save Favorites**: Store your favorite recipe combinations
- **Share Recipes**: Share your creations with friends
- **Statistics Tracking**: Track your recipe creation journey
- **AdMob Integration**: Banner and Interstitial ads for monetization

## 💰 Monetization Strategy

The app uses Google AdMob with multiple ad formats:

1. **Banner Ads**: Displayed at the bottom of the home screen
2. **Interstitial Ads**: Shown every 3rd recipe generation (non-intrusive)
3. **Strategic Placement**: Ads appear at natural break points in user flow

Expected Revenue (estimates):
- 100 daily active users: $5-15/day
- 1,000 daily active users: $50-150/day
- 10,000 daily active users: $500-1,500/day

*Note: Actual revenue depends on user engagement, geography, and ad performance*

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Google AdMob Account

### Step 1: Install Dependencies

```bash
cd ReverseRecipeChallenge
npm install
```

### Step 2: Set Up Google AdMob

1. **Create AdMob Account**
   - Go to https://apps.admob.com
   - Sign in with your Google account
   - Complete the account setup

2. **Create Your App in AdMob**
   - Click "Apps" in the sidebar
   - Click "Add App"
   - Select your platform (Android/iOS)
   - Enter app name: "Reverse Recipe Challenge"
   - Note down your App ID

3. **Create Ad Units**
   - Create a **Banner Ad** unit
   - Create an **Interstitial Ad** unit
   - Note down each Ad Unit ID

4. **Update Configuration Files**

   **For Android** (`android/app/src/main/AndroidManifest.xml`):
   ```xml
   <meta-data
       android:name="com.google.android.gms.ads.APPLICATION_ID"
       android:value="ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"/>
   ```

   **For iOS** (`ios/ReverseRecipeChallenge/Info.plist`):
   ```xml
   <key>GADApplicationIdentifier</key>
   <string>ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX</string>
   ```

   **Ad Unit IDs** (`src/config/admob.js`):
   ```javascript
   BANNER_AD_ID: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
   INTERSTITIAL_AD_ID: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
   ```

### Step 3: Android Setup

```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

**Android Requirements:**
- Android Studio installed
- Android SDK (API 33 recommended)
- An Android emulator or physical device connected

### Step 4: iOS Setup (macOS only)

```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

**iOS Requirements:**
- Xcode installed
- CocoaPods installed
- iOS Simulator or physical device

### Step 5: Testing Ads

The app is configured to use **test ad IDs** in development mode (`__DEV__`). You'll see test ads when running in debug mode.

**IMPORTANT**: Never click on your own ads in production. This can get your AdMob account banned.

## 📁 Project Structure

```
ReverseRecipeChallenge/
├── src/
│   ├── config/
│   │   └── admob.js              # AdMob configuration
│   ├── screens/
│   │   ├── HomeScreen.js         # Main screen with banner ad
│   │   ├── IngredientsScreen.js  # Ingredient input
│   │   ├── RecipeResultScreen.js # Recipe display with interstitial
│   │   ├── SavedRecipesScreen.js # Saved recipes list
│   │   └── SettingsScreen.js     # App settings
│   └── utils/
│       ├── RecipeGenerator.js    # Recipe generation logic
│       └── StorageManager.js     # Local storage management
├── android/                      # Android native files
├── ios/                          # iOS native files
├── App.js                        # Root component
├── index.js                      # Entry point
└── package.json                  # Dependencies
```

## 🎨 Key Features Explained

### Recipe Generation Algorithm

The app uses a creative algorithm that:
- Combines ingredients in unique ways
- Generates cooking methods and presentation styles
- Calculates a "weirdness factor" for entertainment
- Creates step-by-step instructions
- Adds fun facts and descriptions

### Ad Placement Strategy

1. **Banner Ad on Home Screen**
   - Anchored at bottom
   - Always visible but non-intrusive
   - Generates consistent impressions

2. **Interstitial Ads**
   - Shown every 3rd recipe generation
   - Appears during natural transition
   - Doesn't disrupt core user experience

### Data Storage

- All data stored locally using AsyncStorage
- No backend required
- User privacy preserved
- Fast and responsive

## 🔧 Customization

### Change App Colors

Edit the color scheme in each screen's StyleSheet:
- Primary Color: `#FF6B6B` (coral red)
- Secondary Color: `#FF8E53` (orange)
- Accent Color: `#4A90E2` (blue)

### Modify Recipe Algorithm

Edit `src/utils/RecipeGenerator.js`:
- Add new cooking methods
- Customize flavor profiles
- Adjust weirdness calculations
- Add more recipe styles

### Ad Frequency

Modify interstitial ad frequency in `RecipeResultScreen.js`:
```javascript
// Show every 3rd recipe (current)
// Change to show every 5th recipe:
if (recipeCount % 5 === 0 && interstitialLoaded) {
  interstitial.show();
}
```

## 📊 Analytics & Optimization

### Track Key Metrics

1. **User Engagement**
   - Recipes generated per user
   - Save rate
   - Share rate

2. **Ad Performance**
   - Impression rate
   - Click-through rate (CTR)
   - eCPM (effective cost per mille)

3. **Retention**
   - Daily active users (DAU)
   - Weekly active users (WAU)
   - Monthly active users (MAU)

### Optimization Tips

1. **Improve Ad Revenue**
   - Enable mediation in AdMob
   - Test different ad placements
   - Optimize ad refresh rates

2. **Increase User Engagement**
   - Add social sharing features
   - Implement push notifications
   - Create challenges or competitions

3. **App Store Optimization (ASO)**
   - Use relevant keywords
   - Create engaging screenshots
   - Collect positive reviews

## 🚢 Publishing to App Stores

### Android (Google Play)

1. Generate a signed APK:
```bash
cd android
./gradlew assembleRelease
```

2. Upload to Google Play Console
3. Complete store listing
4. Submit for review

### iOS (App Store)

1. Archive the app in Xcode
2. Upload to App Store Connect
3. Complete app information
4. Submit for review

## 📝 Important Notes

### AdMob Policies

- Never click your own ads
- Don't encourage users to click ads
- Follow AdMob content policies
- Ensure app content is appropriate

### Privacy

- Add privacy policy (required for AdMob)
- Disclose data collection
- Implement App Tracking Transparency (iOS)
- Consider GDPR/CCPA compliance

### Testing

Before publishing:
- Test on multiple devices
- Test both Android and iOS
- Verify ad placement doesn't break UI
- Test offline functionality
- Check for memory leaks

## 🐛 Troubleshooting

### Ads Not Showing

1. Check App ID and Ad Unit IDs are correct
2. Ensure you're using test IDs in development
3. Check AdMob account status
4. Verify internet connection
5. Check console for error messages

### Build Errors

**Android:**
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

**iOS:**
```bash
cd ios
pod deintegrate
pod install
cd ..
npx react-native run-ios
```

### Metro Bundler Issues

```bash
npx react-native start --reset-cache
```

## 📄 License

This project is provided as-is for educational and commercial purposes.

## 🤝 Support

For issues or questions:
- Check the troubleshooting section
- Review AdMob documentation: https://developers.google.com/admob
- Review React Native documentation: https://reactnative.dev

## 🎉 Success Tips

1. **Focus on User Experience**: Happy users = more engagement = more ad revenue
2. **Update Regularly**: Keep the app fresh with new features
3. **Listen to Feedback**: Use reviews to improve
4. **Market Your App**: Social media, ASO, word of mouth
5. **Be Patient**: Building a user base takes time

Good luck with your app! 🚀🍳
