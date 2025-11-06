// Recipe Generation Engine
// This generates creative and sometimes hilariously weird recipes

const RECIPE_STYLES = [
  'Fusion', 'Deconstructed', 'Rustic', 'Gourmet', 'Street Food Style',
  'Comfort Food', 'Minimalist', 'Molecular', 'Traditional', 'Avant-Garde'
];

const COOKING_METHODS = [
  'Sautéed', 'Grilled', 'Roasted', 'Pan-fried', 'Steamed', 'Braised',
  'Stir-fried', 'Baked', 'Caramelized', 'Pickled', 'Fermented', 'Air-fried',
  'Sous-vide', 'Smoked', 'Poached'
];

const FLAVOR_PROFILES = [
  'Sweet and Savory', 'Spicy', 'Umami-rich', 'Tangy', 'Herbaceous',
  'Smoky', 'Zesty', 'Creamy', 'Crispy', 'Refreshing'
];

const PRESENTATION_STYLES = [
  'Tower', 'Bowl', 'Wrap', 'Skewer', 'Stack', 'Deconstructed Plate',
  'Tapas Style', 'Family Style', 'Bento Box', 'Slider'
];

const FUNNY_DESCRIPTORS = [
  'Questionable', 'Bold', 'Experimental', 'Revolutionary', 'Mysterious',
  'Unexpected', 'Daring', 'Controversial', 'Instagram-Worthy', 'Chaotic'
];

class RecipeGenerator {
  
  generateRecipe(ingredients, difficulty = 'medium') {
    if (ingredients.length === 0) {
      return this.generateEmptyRecipe();
    }

    const recipeName = this.generateRecipeName(ingredients);
    const description = this.generateDescription(ingredients, difficulty);
    const steps = this.generateSteps(ingredients, difficulty);
    const funFact = this.generateFunFact(ingredients);
    const weirdnessFactor = this.calculateWeirdnessFactor(ingredients);
    const servings = this.calculateServings(ingredients);

    return {
      name: recipeName,
      description,
      ingredients,
      steps,
      funFact,
      weirdnessFactor,
      servings,
      difficulty,
      cookTime: this.estimateCookTime(ingredients, difficulty),
      style: this.randomElement(RECIPE_STYLES),
      flavorProfile: this.randomElement(FLAVOR_PROFILES),
    };
  }

  generateRecipeName(ingredients) {
    const style = this.randomElement(RECIPE_STYLES);
    const method = this.randomElement(COOKING_METHODS);
    
    if (ingredients.length === 1) {
      return `${this.randomElement(FUNNY_DESCRIPTORS)} ${method} ${ingredients[0]}`;
    } else if (ingredients.length === 2) {
      return `${method} ${ingredients[0]} with ${ingredients[1]} ${this.randomElement(PRESENTATION_STYLES)}`;
    } else {
      const mainIngredient = ingredients[0];
      const secondaryIngredient = ingredients[Math.floor(Math.random() * (ingredients.length - 1)) + 1];
      return `${style} ${mainIngredient} and ${secondaryIngredient} ${this.randomElement(PRESENTATION_STYLES)}`;
    }
  }

  generateDescription(ingredients, difficulty) {
    const descriptor = this.randomElement(FUNNY_DESCRIPTORS);
    const flavorProfile = this.randomElement(FLAVOR_PROFILES);
    const style = this.randomElement(RECIPE_STYLES);
    
    const descriptions = [
      `A ${descriptor.toLowerCase()} ${style.toLowerCase()} creation that brings together ${ingredients.join(', ')} in a ${flavorProfile.toLowerCase()} harmony.`,
      `This ${flavorProfile.toLowerCase()} dish transforms humble ${ingredients[0]} into something ${descriptor.toLowerCase()} and memorable.`,
      `${style} cooking meets modern creativity in this ${descriptor.toLowerCase()} combination of ${ingredients.slice(0, 3).join(', ')}.`,
      `Who knew ${ingredients[0]} and ${ingredients[ingredients.length - 1]} could create such ${descriptor.toLowerCase()} magic?`,
    ];

    return this.randomElement(descriptions);
  }

  generateSteps(ingredients, difficulty) {
    const method = this.randomElement(COOKING_METHODS);
    const steps = [];

    // Prep step
    steps.push(`Prepare all ingredients: ${ingredients.map(ing => `clean and prep ${ing}`).join(', ')}.`);

    // Main cooking steps based on ingredient count
    if (ingredients.length === 1) {
      steps.push(`${method} the ${ingredients[0]} until golden and aromatic.`);
      steps.push(`Season to taste and serve with creative garnish.`);
    } else if (ingredients.length === 2) {
      steps.push(`${method} ${ingredients[0]} over medium-high heat for 3-4 minutes.`);
      steps.push(`Add ${ingredients[1]} and continue cooking until well combined.`);
      steps.push(`Adjust seasoning and plate artistically.`);
    } else {
      const mainIngredient = ingredients[0];
      const supportingIngredients = ingredients.slice(1);
      
      steps.push(`${method} ${mainIngredient} in a hot pan until it develops color.`);
      steps.push(`Add ${supportingIngredients.slice(0, 2).join(' and ')}, stirring frequently.`);
      
      if (supportingIngredients.length > 2) {
        steps.push(`Incorporate ${supportingIngredients.slice(2).join(', ')} for added depth.`);
      }
      
      steps.push(`Taste and adjust seasoning. Let flavors meld for 2-3 minutes.`);
      steps.push(`Plate creatively and serve immediately.`);
    }

    // Add difficulty-specific step
    if (difficulty === 'hard') {
      steps.splice(2, 0, `For extra complexity, create a reduction sauce using pan drippings and a splash of wine or stock.`);
    }

    return steps;
  }

  generateFunFact(ingredients) {
    const facts = [
      `Historically, ${ingredients[0]} was considered a delicacy in ancient civilizations!`,
      `This combination was allegedly discovered by a chef during a kitchen emergency.`,
      `Fun fact: ${ingredients[0]} pairs surprisingly well with ${ingredients[ingredients.length - 1]} in molecular gastronomy.`,
      `This recipe has a 78% chance of impressing dinner guests or confusing them completely.`,
      `Legend says a famous chef once served this at a Michelin-starred restaurant... as a dare.`,
      `Your taste buds won't know what hit them – and that's half the adventure!`,
      `This dish is either genius or madness. There's no in-between.`,
      `Social media loves recipes like this – it's controversy cuisine at its finest!`,
    ];

    return this.randomElement(facts);
  }

  calculateWeirdnessFactor(ingredients) {
    // Base weirdness on ingredient count and randomness
    const baseWeirdness = Math.min(ingredients.length * 15, 70);
    const randomFactor = Math.floor(Math.random() * 30);
    return Math.min(baseWeirdness + randomFactor, 100);
  }

  calculateServings(ingredients) {
    return Math.max(1, Math.min(ingredients.length, 4));
  }

  estimateCookTime(ingredients, difficulty) {
    const baseTimes = {
      easy: 15,
      medium: 25,
      hard: 40
    };
    
    const ingredientTime = ingredients.length * 3;
    return baseTimes[difficulty] + ingredientTime;
  }

  generateEmptyRecipe() {
    return {
      name: 'The Nothing Burger',
      description: 'A minimalist approach to cooking. Perfect for those who believe less is more... or who forgot to shop.',
      ingredients: ['Air', 'Ambition', 'Hope'],
      steps: [
        'Open your refrigerator and stare longingly.',
        'Close refrigerator.',
        'Order takeout.',
      ],
      funFact: 'Sometimes the best recipe is calling for pizza delivery!',
      weirdnessFactor: 100,
      servings: 1,
      difficulty: 'expert',
      cookTime: 30,
      style: 'Minimalist',
      flavorProfile: 'Disappointment',
    };
  }

  randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

export default new RecipeGenerator();
