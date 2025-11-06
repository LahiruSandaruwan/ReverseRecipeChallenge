import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@saved_recipes';
const STATS_KEY = '@user_stats';

class StorageManager {
  
  async saveRecipe(recipe) {
    try {
      const existingRecipes = await this.getSavedRecipes();
      const recipeWithId = {
        ...recipe,
        id: Date.now().toString(),
        savedAt: new Date().toISOString(),
      };
      
      const updatedRecipes = [recipeWithId, ...existingRecipes];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
      
      // Update stats
      await this.incrementStat('totalRecipesSaved');
      
      return recipeWithId;
    } catch (error) {
      console.error('Error saving recipe:', error);
      throw error;
    }
  }

  async getSavedRecipes() {
    try {
      const recipesJson = await AsyncStorage.getItem(STORAGE_KEY);
      return recipesJson ? JSON.parse(recipesJson) : [];
    } catch (error) {
      console.error('Error getting saved recipes:', error);
      return [];
    }
  }

  async deleteRecipe(recipeId) {
    try {
      const existingRecipes = await this.getSavedRecipes();
      const filteredRecipes = existingRecipes.filter(r => r.id !== recipeId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRecipes));
      return true;
    } catch (error) {
      console.error('Error deleting recipe:', error);
      return false;
    }
  }

  async clearAllRecipes() {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return true;
    } catch (error) {
      console.error('Error clearing recipes:', error);
      return false;
    }
  }

  // Statistics Management
  async getStats() {
    try {
      const statsJson = await AsyncStorage.getItem(STATS_KEY);
      return statsJson ? JSON.parse(statsJson) : {
        totalRecipesGenerated: 0,
        totalRecipesSaved: 0,
        mostUsedIngredient: null,
        weirdestRecipeScore: 0,
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      return {
        totalRecipesGenerated: 0,
        totalRecipesSaved: 0,
        mostUsedIngredient: null,
        weirdestRecipeScore: 0,
      };
    }
  }

  async updateStats(updates) {
    try {
      const currentStats = await this.getStats();
      const newStats = { ...currentStats, ...updates };
      await AsyncStorage.setItem(STATS_KEY, JSON.stringify(newStats));
      return newStats;
    } catch (error) {
      console.error('Error updating stats:', error);
      throw error;
    }
  }

  async incrementStat(statName) {
    try {
      const stats = await this.getStats();
      stats[statName] = (stats[statName] || 0) + 1;
      await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
      return stats;
    } catch (error) {
      console.error('Error incrementing stat:', error);
      throw error;
    }
  }

  async updateWeirdestRecipe(weirdnessFactor) {
    try {
      const stats = await this.getStats();
      if (weirdnessFactor > stats.weirdestRecipeScore) {
        stats.weirdestRecipeScore = weirdnessFactor;
        await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
      }
      return stats;
    } catch (error) {
      console.error('Error updating weirdest recipe:', error);
      throw error;
    }
  }
}

export default new StorageManager();
