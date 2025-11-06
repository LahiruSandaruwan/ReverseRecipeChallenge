import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import { ADMOB_CONFIG } from '../config/admob';
import RecipeGenerator from '../utils/RecipeGenerator';
import StorageManager from '../utils/StorageManager';

const interstitial = InterstitialAd.createForAdRequest(ADMOB_CONFIG.INTERSTITIAL_AD_ID);

const RecipeResultScreen = ({ route, navigation }) => {
  const { ingredients, difficulty } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);

  useEffect(() => {
    // Generate recipe
    const generatedRecipe = RecipeGenerator.generateRecipe(ingredients, difficulty);
    setRecipe(generatedRecipe);

    // Update stats
    StorageManager.incrementStat('totalRecipesGenerated');
    StorageManager.updateWeirdestRecipe(generatedRecipe.weirdnessFactor);

    // Load interstitial ad
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInterstitialLoaded(true);
        console.log('Interstitial ad loaded');
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        console.log('Interstitial ad closed');
        // Reload ad for next time
        interstitial.load();
      }
    );

    interstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, [ingredients, difficulty]);

  const saveRecipe = async () => {
    try {
      await StorageManager.saveRecipe(recipe);
      Alert.alert('Saved!', 'Recipe saved to your collection', [
        { text: 'OK' }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Could not save recipe');
    }
  };

  const shareRecipe = async () => {
    try {
      const message = `Check out this ${recipe.weirdnessFactor}% weird recipe I created!\n\n` +
        `${recipe.name}\n\n` +
        `Ingredients: ${recipe.ingredients.join(', ')}\n\n` +
        `Created with Reverse Recipe Challenge app!`;

      await Share.share({
        message,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const generateAnother = () => {
    // Show interstitial ad every 3rd recipe generation
    if (interstitialLoaded) {
      interstitial.show();
    }
    navigation.goBack();
  };

  const getWeirdnessColor = (factor) => {
    if (factor < 30) return '#4CAF50';
    if (factor < 60) return '#FFC107';
    return '#FF5722';
  };

  const getWeirdnessLabel = (factor) => {
    if (factor < 30) return 'Totally Normal';
    if (factor < 50) return 'Slightly Adventurous';
    if (factor < 70) return 'Pretty Weird';
    if (factor < 85) return 'Seriously Weird';
    return 'EXTREMELY WEIRD';
  };

  if (!recipe) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Generating your recipe...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Recipe Header */}
        <View style={styles.header}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{recipe.style}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{recipe.difficulty}</Text>
            </View>
          </View>
        </View>

        {/* Weirdness Meter */}
        <View style={styles.weirdnessContainer}>
          <Text style={styles.weirdnessTitle}>Weirdness Factor</Text>
          <View style={styles.weirdnessMeter}>
            <View
              style={[
                styles.weirdnessFill,
                {
                  width: `${recipe.weirdnessFactor}%`,
                  backgroundColor: getWeirdnessColor(recipe.weirdnessFactor),
                },
              ]}
            />
          </View>
          <Text style={[styles.weirdnessLabel, { color: getWeirdnessColor(recipe.weirdnessFactor) }]}>
            {recipe.weirdnessFactor}% - {getWeirdnessLabel(recipe.weirdnessFactor)}
          </Text>
        </View>

        {/* Recipe Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Icon name="schedule" size={20} color="#FF6B6B" />
            <Text style={styles.infoText}>{recipe.cookTime} min</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="restaurant" size={20} color="#FF6B6B" />
            <Text style={styles.infoText}>{recipe.servings} servings</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="local-fire-department" size={20} color="#FF6B6B" />
            <Text style={styles.infoText}>{recipe.flavorProfile}</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{recipe.description}</Text>
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <Icon name="check-circle" size={20} color="#4CAF50" />
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipe.steps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Fun Fact */}
        <View style={styles.funFactContainer}>
          <Icon name="lightbulb" size={24} color="#FFC107" />
          <Text style={styles.funFactText}>{recipe.funFact}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={saveRecipe}>
            <Icon name="favorite" size={24} color="#FF6B6B" />
            <Text style={styles.actionButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={shareRecipe}>
            <Icon name="share" size={24} color="#4A90E2" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.generateAnotherButton}
          onPress={generateAnother}>
          <Text style={styles.generateAnotherText}>Generate Another Recipe 🎲</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#FF6B6B',
    padding: 20,
    alignItems: 'center',
  },
  recipeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  badges: {
    flexDirection: 'row',
    gap: 10,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  weirdnessContainer: {
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  weirdnessTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  weirdnessMeter: {
    height: 30,
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    overflow: 'hidden',
  },
  weirdnessFill: {
    height: '100%',
    borderRadius: 15,
  },
  weirdnessLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  funFactContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF9E6',
    padding: 15,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
    gap: 10,
  },
  funFactText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    gap: 5,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  generateAnotherButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    marginHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  generateAnotherText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecipeResultScreen;
