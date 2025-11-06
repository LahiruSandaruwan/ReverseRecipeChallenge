import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { ADMOB_CONFIG } from '../config/admob';
import StorageManager from '../utils/StorageManager';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [stats, setStats] = useState({
    totalRecipesGenerated: 0,
    totalRecipesSaved: 0,
    weirdestRecipeScore: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const userStats = await StorageManager.getStats();
    setStats(userStats);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={['#FF6B6B', '#FF8E53']}
          style={styles.headerGradient}>
          <Text style={styles.title}>🍳 Reverse Recipe</Text>
          <Text style={styles.subtitle}>Challenge</Text>
          <Text style={styles.tagline}>
            Turn Random Ingredients into Culinary Adventures!
          </Text>
        </LinearGradient>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{stats.totalRecipesGenerated}</Text>
            <Text style={styles.statLabel}>Recipes Created</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{stats.totalRecipesSaved}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{stats.weirdestRecipeScore}%</Text>
            <Text style={styles.statLabel}>Max Weirdness</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How It Works:</Text>
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>1️⃣</Text>
            <Text style={styles.stepText}>Add your random ingredients</Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>2️⃣</Text>
            <Text style={styles.stepText}>Choose difficulty level</Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>3️⃣</Text>
            <Text style={styles.stepText}>Get a creative (and sometimes hilarious) recipe!</Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>4️⃣</Text>
            <Text style={styles.stepText}>Share with friends or actually cook it!</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Ingredients')}>
          <Text style={styles.primaryButtonText}>Start Creating! 🚀</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('SavedRecipes')}>
          <Text style={styles.secondaryButtonText}>View Saved Recipes 📚</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tertiaryButton}
          onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.tertiaryButtonText}>Settings ⚙️</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Banner Ad at bottom */}
      <View style={styles.bannerContainer}>
        <BannerAd
          unitId={ADMOB_CONFIG.BANNER_AD_ID}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: false,
          }}
          onAdLoaded={() => {
            console.log('Banner ad loaded');
          }}
          onAdFailedToLoad={(error) => {
            console.log('Banner ad failed to load:', error);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerGradient: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginTop: -5,
  },
  tagline: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#F8F9FA',
    marginHorizontal: 15,
    marginTop: -20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  infoSection: {
    padding: 20,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    fontSize: 24,
    marginRight: 10,
  },
  stepText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: 10,
    elevation: 5,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#FFF',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: 12,
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  secondaryButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tertiaryButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: 12,
  },
  tertiaryButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  bannerContainer: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 5,
  },
});

export default HomeScreen;
