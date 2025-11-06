import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StorageManager from '../utils/StorageManager';

const SettingsScreen = () => {
  const [stats, setStats] = useState({
    totalRecipesGenerated: 0,
    totalRecipesSaved: 0,
    weirdestRecipeScore: 0,
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const userStats = await StorageManager.getStats();
    setStats(userStats);
  };

  const resetStats = () => {
    Alert.alert(
      'Reset Statistics',
      'Are you sure you want to reset all statistics? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await StorageManager.updateStats({
              totalRecipesGenerated: 0,
              totalRecipesSaved: 0,
              mostUsedIngredient: null,
              weirdestRecipeScore: 0,
            });
            loadStats();
            Alert.alert('Success', 'Statistics have been reset');
          },
        },
      ]
    );
  };

  const openPrivacyPolicy = () => {
    Alert.alert('Privacy Policy', 'This app does not collect any personal data. All recipes are stored locally on your device.');
  };

  const openTerms = () => {
    Alert.alert('Terms of Service', 'By using this app, you agree to have fun and experiment with weird recipes! 😄');
  };

  const contactSupport = () => {
    Alert.alert('Contact Support', 'Email us at: support@reverserecipechallenge.com');
  };

  const rateApp = () => {
    Alert.alert('Rate Us', 'Thank you for your support! Please rate us on the app store.');
  };

  const SettingItem = ({ icon, title, value, onPress, showArrow = true, rightComponent }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={!onPress}>
      <View style={styles.settingLeft}>
        <Icon name={icon} size={24} color="#FF6B6B" />
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {value && <Text style={styles.settingValue}>{value}</Text>}
        </View>
      </View>
      {rightComponent || (showArrow && onPress && (
        <Icon name="chevron-right" size={24} color="#CCC" />
      ))}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Statistics Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Recipes Generated:</Text>
            <Text style={styles.statValue}>{stats.totalRecipesGenerated}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Recipes Saved:</Text>
            <Text style={styles.statValue}>{stats.totalRecipesSaved}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Highest Weirdness:</Text>
            <Text style={styles.statValue}>{stats.weirdestRecipeScore}%</Text>
          </View>
          <TouchableOpacity style={styles.resetButton} onPress={resetStats}>
            <Text style={styles.resetButtonText}>Reset Statistics</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <SettingItem
          icon="notifications"
          title="Daily Recipe Reminder"
          onPress={() => setNotificationsEnabled(!notificationsEnabled)}
          showArrow={false}
          rightComponent={
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#CCC', true: '#FFB3B3' }}
              thumbColor={notificationsEnabled ? '#FF6B6B' : '#f4f3f4'}
            />
          }
        />
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <SettingItem
          icon="star"
          title="Rate This App"
          onPress={rateApp}
        />
        <SettingItem
          icon="share"
          title="Share with Friends"
          onPress={() => Alert.alert('Share', 'Share this app with your friends!')}
        />
        <SettingItem
          icon="email"
          title="Contact Support"
          onPress={contactSupport}
        />
      </View>

      {/* Legal Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>
        <SettingItem
          icon="privacy-tip"
          title="Privacy Policy"
          onPress={openPrivacyPolicy}
        />
        <SettingItem
          icon="description"
          title="Terms of Service"
          onPress={openTerms}
        />
      </View>

      {/* App Info */}
      <View style={styles.appInfoContainer}>
        <Text style={styles.appName}>Reverse Recipe Challenge</Text>
        <Text style={styles.appVersion}>Version 1.0.0</Text>
        <Text style={styles.appCopyright}>© 2025 Reverse Recipe Challenge</Text>
        <Text style={styles.appTagline}>Turn Random Ingredients into Culinary Adventures!</Text>
      </View>

      {/* Ad Info */}
      <View style={styles.adInfoContainer}>
        <Icon name="info-outline" size={16} color="#999" />
        <Text style={styles.adInfoText}>
          This app is supported by ads to keep it free for everyone
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  section: {
    marginTop: 20,
    backgroundColor: '#FFF',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
  },
  settingValue: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  statsCard: {
    padding: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  resetButton: {
    marginTop: 10,
    paddingVertical: 12,
    backgroundColor: '#FFE8E8',
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
  },
  appInfoContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  appVersion: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  appCopyright: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  appTagline: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  adInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 8,
  },
  adInfoText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default SettingsScreen;
