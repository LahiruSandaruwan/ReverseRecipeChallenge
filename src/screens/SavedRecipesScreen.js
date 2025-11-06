import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StorageManager from '../utils/StorageManager';

const SavedRecipesScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [expandedRecipe, setExpandedRecipe] = useState(null);

  useFocusEffect(
    useCallback(() => {
      loadRecipes();
    }, [])
  );

  const loadRecipes = async () => {
    const savedRecipes = await StorageManager.getSavedRecipes();
    setRecipes(savedRecipes);
  };

  const deleteRecipe = (recipeId) => {
    Alert.alert(
      'Delete Recipe',
      'Are you sure you want to delete this recipe?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await StorageManager.deleteRecipe(recipeId);
            loadRecipes();
          },
        },
      ]
    );
  };

  const clearAllRecipes = () => {
    Alert.alert(
      'Clear All Recipes',
      'Are you sure you want to delete all saved recipes? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await StorageManager.clearAllRecipes();
            loadRecipes();
          },
        },
      ]
    );
  };

  const toggleExpand = (recipeId) => {
    setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId);
  };

  const getWeirdnessColor = (factor) => {
    if (factor < 30) return '#4CAF50';
    if (factor < 60) return '#FFC107';
    return '#FF5722';
  };

  const renderRecipeItem = ({ item }) => {
    const isExpanded = expandedRecipe === item.id;

    return (
      <View style={styles.recipeCard}>
        <TouchableOpacity
          style={styles.recipeHeader}
          onPress={() => toggleExpand(item.id)}>
          <View style={styles.recipeHeaderContent}>
            <Text style={styles.recipeName}>{item.name}</Text>
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeStyle}>{item.style}</Text>
              <View style={styles.weirdnessBadge}>
                <Text
                  style={[
                    styles.weirdnessText,
                    { color: getWeirdnessColor(item.weirdnessFactor) },
                  ]}>
                  {item.weirdnessFactor}% weird
                </Text>
              </View>
            </View>
          </View>
          <Icon
            name={isExpanded ? 'expand-less' : 'expand-more'}
            size={28}
            color="#666"
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.recipeDetails}>
            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.detailRow}>
              <Icon name="schedule" size={18} color="#666" />
              <Text style={styles.detailText}>{item.cookTime} min</Text>
              <Icon name="restaurant" size={18} color="#666" style={{ marginLeft: 15 }} />
              <Text style={styles.detailText}>{item.servings} servings</Text>
            </View>

            <Text style={styles.sectionTitle}>Ingredients:</Text>
            {item.ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.ingredientText}>
                • {ingredient}
              </Text>
            ))}

            <Text style={styles.sectionTitle}>Instructions:</Text>
            {item.steps.map((step, index) => (
              <Text key={index} style={styles.stepText}>
                {index + 1}. {step}
              </Text>
            ))}

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteRecipe(item.id)}>
                <Icon name="delete" size={20} color="#FF5722" />
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="bookmark-border" size={80} color="#CCC" />
      <Text style={styles.emptyTitle}>No Saved Recipes Yet</Text>
      <Text style={styles.emptyText}>
        Create and save your favorite recipe combinations!
      </Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('Ingredients')}>
        <Text style={styles.createButtonText}>Create Recipe</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {recipes.length > 0 ? (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {recipes.length} Saved Recipe{recipes.length !== 1 ? 's' : ''}
            </Text>
            <TouchableOpacity onPress={clearAllRecipes}>
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recipes}
            renderItem={renderRecipeItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
        </>
      ) : (
        renderEmptyState()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  clearAllText: {
    fontSize: 14,
    color: '#FF5722',
    fontWeight: '600',
  },
  listContent: {
    padding: 10,
  },
  recipeCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  recipeHeaderContent: {
    flex: 1,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  recipeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  recipeStyle: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  weirdnessBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  weirdnessText: {
    fontSize: 12,
    fontWeight: '600',
  },
  recipeDetails: {
    padding: 15,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    paddingLeft: 10,
  },
  stepText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  deleteButtonText: {
    color: '#FF5722',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  createButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SavedRecipesScreen;
