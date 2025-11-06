// AdMob Configuration
// Replace these with your actual AdMob Ad Unit IDs from Google AdMob Console

export const ADMOB_CONFIG = {
  // For testing, use test IDs. Replace with real IDs for production
  BANNER_AD_ID: __DEV__ 
    ? 'ca-app-pub-3940256099942544/6300978111' // Test Banner ID
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // Your real Banner ID
  
  INTERSTITIAL_AD_ID: __DEV__
    ? 'ca-app-pub-3940256099942544/1033173712' // Test Interstitial ID
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // Your real Interstitial ID
  
  REWARDED_AD_ID: __DEV__
    ? 'ca-app-pub-3940256099942544/5224354917' // Test Rewarded ID
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // Your real Rewarded ID
};

// How to get your AdMob IDs:
// 1. Go to https://apps.admob.com
// 2. Create an app in AdMob console
// 3. Create ad units (Banner, Interstitial, Rewarded)
// 4. Copy the Ad Unit IDs and replace the production IDs above
