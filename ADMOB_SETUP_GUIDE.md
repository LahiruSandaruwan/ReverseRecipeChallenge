# 🎯 Complete AdMob Setup Guide

## Step-by-Step Guide to Set Up AdMob and Start Earning

### Phase 1: Create AdMob Account

1. **Sign Up for AdMob**
   - Visit: https://apps.admob.com
   - Click "Sign Up" or "Sign In" with your Google account
   - Accept the AdMob terms and conditions
   - Complete your account information

2. **Set Up Payment Information**
   - Go to "Payments" in the sidebar
   - Add your payment information
   - Set your payment threshold (minimum $100)
   - Verify your address (required for payments)

### Phase 2: Create Your App in AdMob

1. **Add a New App**
   - In AdMob console, click "Apps" in the left sidebar
   - Click "ADD APP" button
   - Select "NO" for "Is your app listed on a supported app store?"
   - Enter App Name: "Reverse Recipe Challenge"
   - Select Platform: Start with Android (easier for testing)
   - Click "ADD"

2. **Note Your App ID**
   - After creating the app, you'll see an App ID like:
     `ca-app-pub-1234567890123456~0987654321`
   - **SAVE THIS ID** - you'll need it in Step 4

### Phase 3: Create Ad Units

#### Create Banner Ad Unit

1. In your app's page, click "Ad units" tab
2. Click "GET STARTED" or "ADD AD UNIT"
3. Select "Banner"
4. Configure:
   - Ad unit name: "Home Banner"
   - Advanced settings: Keep defaults
5. Click "CREATE AD UNIT"
6. **SAVE the Ad unit ID** (format: `ca-app-pub-XXXX/YYYY`)

#### Create Interstitial Ad Unit

1. Click "ADD AD UNIT" again
2. Select "Interstitial"
3. Configure:
   - Ad unit name: "Recipe Generated"
   - Advanced settings: Keep defaults
4. Click "CREATE AD UNIT"
5. **SAVE the Ad unit ID**

### Phase 4: Update Your App Configuration

#### 1. Update AdMob Config File

Open `src/config/admob.js` and replace the production IDs:

```javascript
export const ADMOB_CONFIG = {
  BANNER_AD_ID: __DEV__ 
    ? 'ca-app-pub-3940256099942544/6300978111' // Test ID - keep this
    : 'ca-app-pub-XXXX/YYYY', // Replace with your Banner Ad Unit ID
  
  INTERSTITIAL_AD_ID: __DEV__
    ? 'ca-app-pub-3940256099942544/1033173712' // Test ID - keep this
    : 'ca-app-pub-XXXX/ZZZZ', // Replace with your Interstitial Ad Unit ID
};
```

#### 2. Update Android Configuration

Open `android/app/src/main/AndroidManifest.xml`:

Find this line:
```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-3940256099942544~3347511713"/>
```

Replace the value with your AdMob App ID:
```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-XXXX~YYYY"/>
```

#### 3. Update iOS Configuration (if building for iOS)

Open `ios/ReverseRecipeChallenge/Info.plist`:

Find this section:
```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-3940256099942544~1458002511</string>
```

Replace with your iOS AdMob App ID:
```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-XXXX~YYYY</string>
```

### Phase 5: Testing Ads in Development

#### Important Testing Rules

1. **ALWAYS use test ads during development**
   - The app is already configured to use test IDs in `__DEV__` mode
   - NEVER click on real ads during testing
   - Clicking your own ads = AdMob account suspension

2. **Test Ad Behavior**
   ```bash
   # Run in debug mode (uses test ads)
   npx react-native run-android
   
   # Or for iOS
   npx react-native run-ios
   ```

3. **Verify Test Ads Appear**
   - Banner ad should appear at bottom of home screen
   - Generate 3 recipes to see interstitial ad
   - Test ads will show "Test Ad" label

#### What to Test

- ✅ Banner ad loads on home screen
- ✅ Banner ad doesn't cover content
- ✅ Interstitial appears after 3rd recipe
- ✅ Interstitial doesn't crash the app
- ✅ Ads don't break navigation
- ✅ App works without internet (graceful ad failure)

### Phase 6: Publish Your App

#### Before Publishing Checklist

1. **Switch to Production Ads**
   - The app automatically uses real ad IDs when built in release mode
   - No code changes needed if you followed Phase 4

2. **Create Privacy Policy** (REQUIRED)
   - AdMob requires a privacy policy
   - Include information about:
     - What data is collected
     - How ads use data
     - User's choices
   - Free tools: https://www.privacypolicygenerator.info

3. **Prepare App Store Listing**
   - App icon (512x512 for Android, 1024x1024 for iOS)
   - Screenshots (at least 2)
   - App description
   - Privacy policy URL

#### Build Release Version

**For Android:**
```bash
cd android
./gradlew assembleRelease
# APK location: android/app/build/outputs/apk/release/app-release.apk
```

**For iOS:**
1. Open project in Xcode
2. Select "Any iOS Device" as target
3. Product → Archive
4. Upload to App Store Connect

#### Publish to Google Play

1. Go to https://play.google.com/console
2. Create a new app
3. Upload your APK/AAB
4. Complete all store listing fields
5. Add privacy policy URL
6. Set content rating
7. Submit for review

### Phase 7: Enable Mediation (Advanced - Optional)

Mediation allows you to serve ads from multiple networks, increasing revenue:

1. In AdMob console, go to "Mediation"
2. Click "CREATE MEDIATION GROUP"
3. Add ad sources (Facebook Audience Network, Unity Ads, etc.)
4. Set up waterfall or bidding
5. Update your app with additional SDKs if needed

### Phase 8: Monitor and Optimize

#### Track These Metrics

1. **AdMob Dashboard** (https://apps.admob.com)
   - Impressions
   - Click-through rate (CTR)
   - eCPM (earnings per 1000 impressions)
   - Total earnings

2. **Key Performance Indicators**
   - Daily Active Users (DAU)
   - Ad impressions per user
   - Revenue per user
   - Fill rate

#### Optimization Tips

1. **Week 1-2: Monitor**
   - Watch ad performance
   - Check for errors in AdMob console
   - Ensure ads are showing correctly

2. **Week 3-4: Optimize**
   - Experiment with ad placement
   - Test different ad formats
   - Consider adding rewarded ads

3. **Month 2+: Scale**
   - Enable mediation
   - Add more ad units
   - A/B test ad frequency

### Expected Revenue Timeline

**Realistic Expectations:**

| Users/Day | Estimated Revenue/Month |
|-----------|------------------------|
| 100       | $50 - $200            |
| 500       | $250 - $1,000         |
| 1,000     | $500 - $2,000         |
| 5,000     | $2,500 - $10,000      |
| 10,000+   | $5,000 - $20,000+     |

*Note: Revenue varies by:*
- User location (US/EU users worth more)
- Ad engagement
- App category
- Seasonality
- Ad fill rate

### Common Issues and Solutions

#### Issue: Ads Not Showing in Production

**Solutions:**
1. Wait 24-48 hours after publishing (AdMob needs time)
2. Check AdMob account is approved
3. Verify app IDs are correct
4. Check internet connectivity
5. Review AdMob policy compliance

#### Issue: Low Fill Rate

**Solutions:**
1. Enable mediation
2. Ensure app complies with AdMob policies
3. Check user geography
4. Wait for AdMob to optimize

#### Issue: Account Suspended

**Prevention:**
- NEVER click your own ads
- Don't incentivize ad clicks
- Follow content policies
- Ensure privacy policy is accurate

### Important AdMob Policies

❌ **NEVER DO:**
- Click your own ads
- Ask users to click ads
- Place ads on empty pages
- Use automated clicking
- Misrepresent content

✅ **ALWAYS DO:**
- Have a privacy policy
- Disclose ad serving
- Comply with COPPA (if targeting children)
- Follow app store guidelines
- Keep app content appropriate

### Resources

- **AdMob Help:** https://support.google.com/admob
- **AdMob Policies:** https://support.google.com/admob/answer/6128543
- **Revenue Calculator:** https://admob.google.com/home/resources/revenue-calculator/
- **Best Practices:** https://developers.google.com/admob/android/best-practices

### Support

If you need help:
1. Check AdMob Help Center
2. Visit AdMob Community Forum
3. Review React Native Google Mobile Ads docs: https://docs.page/invertase/react-native-google-mobile-ads

---

## Quick Reference: Your AdMob IDs

Keep this information handy:

```
AdMob Account: [Your Email]
App ID (Android): ca-app-pub-XXXX~YYYY
App ID (iOS): ca-app-pub-XXXX~YYYY
Banner Ad Unit: ca-app-pub-XXXX/YYYY
Interstitial Ad Unit: ca-app-pub-XXXX/ZZZZ
```

---

**🎉 Congratulations!** You're now set up to earn money with your app!

Remember: Success takes time. Focus on building a great user experience, and the revenue will follow.
