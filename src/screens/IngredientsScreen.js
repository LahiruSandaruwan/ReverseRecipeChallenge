import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SUGGESTED_INGREDIENTS = [
  'Chicken', 'Beef', 'Eggs', 'Cheese', 'Tomatoes', 'Onions',
  'Garlic', 'Pasta', 'Rice', 'Potatoes', 'Carrots', 'Broccoli',
  'Mushrooms', 'Bacon', 'Salmon', 'Shrimp', 'Tofu', 'Avocado',
  'Spinach', 'Bell Peppers', 'Chocolate', 'Bananas', 'Apples',
  'Honey', 'Soy Sauce', 'Olive Oil', 'Butter', 'Milk', 'Flour',
];

const IngredientsScreen = ({ navigation }) => {
  const [ingredients, setIngredients] = useState([]);
  const [inputText, setInputText] = useState('');
  const [difficulty, setDifficulty] = useState('medium');

  const addIngredient = () => {
    if (inputText.trim() === '') {
      Alert.alert('Oops!', 'Please enter an ingredient');
      return;
    }

    if (ingredients.length >= 10) {
      Alert.alert('Wow!', "That's a lot of ingredients! Try generating a recipe with what you have.");
      return;
    }

    const newIngredient = inputText.trim();
    if (ingredients.includes(newIngredient)) {
      Alert.alert('Already Added', 'This ingredient is already in your list!');
      return;
    }

    setIngredients([...ingredients, newIngredient]);
    setInputText('');
  };

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter(item => item !== ingredient));
  };

  const addSuggestedIngredient = (ingredient) => {
    if (ingredients.length >= 10) {
      Alert.alert('Maximum Reached', "You've added enough ingredients!");
      return;
    }

    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const generateRecipe = () => {
    if (ingredients.length === 0) {
      Alert.alert(
        'No Ingredients',
        'Add at least one ingredient to generate a recipe!',
        [{ text: 'OK' }]
      );
      return;
    }

    navigation.navigate('RecipeResult', {
      ingredients,
      difficulty,
    });
  };

  const renderIngredientItem = ({ item }) => (
    <View style={styles.ingredientTag}>
      <Text style={styles.ingredientText}>{item}</Text>
      <TouchableOpacity onPress={() => removeIngredient(item)}>
        <Icon name="close" size={20} color="#FF6B6B" />
      </TouchableOpacity>
    </View>
  );

  const renderSuggestedItem = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestedTag}
      onPress={() => addSuggestedIngredient(item)}>
      <Text style={styles.suggestedText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.content}>
        {/* Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>Add Your Ingredients</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="e.g., Chicken, Tomatoes..."
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={addIngredient}
              returnKeyType="done"
            />
            <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
              <Icon name="add" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Added Ingredients */}
          {ingredients.length > 0 && (
            <View style={styles.ingredientsListContainer}>
              <Text style={styles.listTitle}>
                Your Ingredients ({ingredients.length}/10):
              </Text>
              <FlatList
                data={ingredients}
                renderItem={renderIngredientItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.ingredientsList}
              />
            </View>
          )}
        </View>

        {/* Difficulty Selection */}
        <View style={styles.difficultySection}>
          <Text style={styles.sectionTitle}>Choose Difficulty</Text>
          <View style={styles.difficultyButtons}>
            <TouchableOpacity
              style={[
                styles.difficultyButton,
                difficulty === 'easy' && styles.difficultyButtonActive,
              ]}
              onPress={() => setDifficulty('easy')}>
              <Text
                style={[
                  styles.difficultyText,
                  difficulty === 'easy' && styles.difficultyTextActive,
                ]}>
                Easy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.difficultyButton,
                difficulty === 'medium' && styles.difficultyButtonActive,
              ]}
              onPress={() => setDifficulty('medium')}>
              <Text
                style={[
                  styles.difficultyText,
                  difficulty === 'medium' && styles.difficultyTextActive,
                ]}>
                Medium
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.difficultyButton,
                difficulty === 'hard' && styles.difficultyButtonActive,
              ]}
              onPress={() => setDifficulty('hard')}>
              <Text
                style={[
                  styles.difficultyText,
                  difficulty === 'hard' && styles.difficultyTextActive,
                ]}>
                Hard
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Suggested Ingredients */}
        <View style={styles.suggestedSection}>
          <Text style={styles.sectionTitle}>Quick Add:</Text>
          <FlatList
            data={SUGGESTED_INGREDIENTS}
            renderItem={renderSuggestedItem}
            keyExtractor={(item) => item}
            numColumns={3}
            scrollEnabled={false}
          />
        </View>

        {/* Generate Button */}
        <TouchableOpacity
          style={[
            styles.generateButton,
            ingredients.length === 0 && styles.generateButtonDisabled,
          ]}
          onPress={generateRecipe}
          disabled={ingredients.length === 0}>
          <Text style={styles.generateButtonText}>
            Generate Recipe! 🎲
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#FF6B6B',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  ingredientsListContainer: {
    marginTop: 15,
  },
  listTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ingredientsList: {
    flexGrow: 0,
  },
  ingredientTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE8E8',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  ingredientText: {
    color: '#FF6B6B',
    fontWeight: '600',
    marginRight: 5,
  },
  difficultySection: {
    marginBottom: 20,
  },
  difficultyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  difficultyButtonActive: {
    backgroundColor: '#FF6B6B',
  },
  difficultyText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  difficultyTextActive: {
    color: '#FFF',
  },
  suggestedSection: {
    flex: 1,
    marginBottom: 20,
  },
  suggestedTag: {
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    margin: 4,
    flex: 1,
    alignItems: 'center',
  },
  suggestedText: {
    color: '#4A90E2',
    fontSize: 13,
  },
  generateButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  generateButtonDisabled: {
    backgroundColor: '#CCC',
    elevation: 0,
  },
  generateButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default IngredientsScreen;
