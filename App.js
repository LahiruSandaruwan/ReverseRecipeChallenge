import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import mobileAds from 'react-native-google-mobile-ads';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import IngredientsScreen from './src/screens/IngredientsScreen';
import RecipeResultScreen from './src/screens/RecipeResultScreen';
import SavedRecipesScreen from './src/screens/SavedRecipesScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // Initialize Google Mobile Ads
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('AdMob initialized:', adapterStatuses);
      })
      .catch(error => {
        console.error('AdMob initialization error:', error);
      });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B6B" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#FF6B6B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Recipe Challenge' }}
          />
          <Stack.Screen 
            name="Ingredients" 
            component={IngredientsScreen}
            options={{ title: 'Add Ingredients' }}
          />
          <Stack.Screen 
            name="RecipeResult" 
            component={RecipeResultScreen}
            options={{ title: 'Your Recipe!' }}
          />
          <Stack.Screen 
            name="SavedRecipes" 
            component={SavedRecipesScreen}
            options={{ title: 'Saved Recipes' }}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
