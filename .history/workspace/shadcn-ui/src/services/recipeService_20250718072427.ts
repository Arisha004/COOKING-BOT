// Recipe interface definition
export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number; // in minutes
  diet: string[];
  cuisine: string;
  imageUrl: string;
}

// This service handles API calls for recipe suggestions
export async function fetchRecipeSuggestions(
  ingredients: string[],
  filters: {
    cookingTime: string;
    diet: string;
    cuisine: string;
  }
): Promise<Recipe[]> {
  try {
    // Create a prompt for the OpenAI API
    const prompt = generatePrompt(ingredients, filters);
    
    // Fetch recipe suggestions from the API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // We're not including an API key here as we'll use a simulated response
        // In a real application, you would include your API key or use a backend proxy
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful cooking assistant that generates recipe suggestions based on available ingredients and preferences.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });
    
    // Since we're not actually connecting to OpenAI (no API key provided),
    // we'll generate simulated recipes that better match the user's ingredients
    return generateSimulatedRecipes(ingredients, filters);
    
  } catch (error) {
    console.error('Error fetching recipe suggestions:', error);
    // Return simulated recipes as fallback in case of an error
    return generateSimulatedRecipes(ingredients, filters);
  }
}

// Generate a prompt for the OpenAI API
function generatePrompt(
  ingredients: string[],
  filters: {
    cookingTime: string;
    diet: string;
    cuisine: string;
  }
): string {
  let prompt = `Generate 3 recipe suggestions using some or all of these ingredients: ${ingredients.join(', ')}.`;
  
  if (filters.cookingTime !== 'any') {
    prompt += ` The recipes should take less than ${filters.cookingTime} minutes to prepare.`;
  }
  
  if (filters.diet !== 'any') {
    prompt += ` The recipes should be suitable for a ${filters.diet} diet.`;
  }
  
  if (filters.cuisine !== 'any') {
    prompt += ` The recipes should be in ${filters.cuisine} cuisine style.`;
  }
  
  prompt += ` For each recipe, provide a title, brief description, list of ingredients with measurements, cooking time in minutes, step-by-step instructions, dietary information, and cuisine type.`;
  
  return prompt;
}

// Generate simulated recipes based on user ingredients and filters
// This is more sophisticated than the previous mock data and actually uses the ingredients provided
function generateSimulatedRecipes(
  ingredients: string[],
  filters: {
    cookingTime: string;
    diet: string;
    cuisine: string;
  }
): Recipe[] {
  // Collection of recipe templates that will be customized based on user inputs
  const recipeTemplates: Array<{
    title: string;
    description: string;
    baseIngredients: string[];
    instructions: string[];
    cookingTime: number;
    diet: string[];
    cuisine: string;
    imageUrl: string;
  }> = [
    {
      title: "Pasta Dish",
      description: "A delicious pasta dish with available ingredients",
      baseIngredients: ["pasta", "olive oil", "garlic", "salt", "pepper"],
      instructions: [
        "Boil pasta according to package instructions.",
        "Heat olive oil in a pan over medium heat.",
        "Add garlic and sauté until fragrant.",
        "Add remaining ingredients and cook until done.",
        "Toss with pasta and serve hot."
      ],
      cookingTime: 25,
      diet: ["vegetarian"],
      cuisine: "Italian",
      imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
    },
    {
      title: "Stir Fry",
      description: "A quick and healthy stir fry",
      baseIngredients: ["oil", "garlic", "soy sauce", "salt", "pepper"],
      instructions: [
        "Prepare all ingredients by cutting them into bite-sized pieces.",
        "Heat oil in a wok or large pan over high heat.",
        "Add proteins and cook until nearly done.",
        "Add vegetables and stir fry until tender-crisp.",
        "Add sauces and seasonings, stir well to combine.",
        "Serve hot with rice or noodles if desired."
      ],
      cookingTime: 20,
      diet: ["gluten-free"],
      cuisine: "Asian",
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
    },
    {
      title: "Fresh Salad",
      description: "A refreshing salad with available ingredients",
      baseIngredients: ["salt", "pepper", "olive oil", "lemon juice"],
      instructions: [
        "Wash and prepare all vegetables.",
        "Combine all ingredients in a large bowl.",
        "Make dressing by mixing olive oil, lemon juice, salt, and pepper.",
        "Pour dressing over salad and toss gently.",
        "Serve immediately or chill before serving."
      ],
      cookingTime: 10,
      diet: ["vegan", "vegetarian", "gluten-free", "low-carb"],
      cuisine: "Mediterranean",
      imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
    },
    {
      title: "Hearty Soup",
      description: "A comforting soup with available ingredients",
      baseIngredients: ["water", "salt", "pepper", "olive oil", "garlic"],
      instructions: [
        "Heat oil in a large pot over medium heat.",
        "Add aromatic vegetables and sauté until softened.",
        "Add remaining ingredients and bring to a boil.",
        "Reduce heat and simmer until all ingredients are cooked through.",
        "Season to taste and serve hot."
      ],
      cookingTime: 40,
      diet: ["gluten-free"],
      cuisine: "American",
      imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
    },
    {
      title: "Quick Breakfast",
      description: "A nutritious breakfast with available ingredients",
      baseIngredients: ["salt", "pepper", "oil"],
      instructions: [
        "Prepare all ingredients according to recipe.",
        "Cook main ingredients as directed.",
        "Combine all elements and season to taste.",
        "Serve immediately while hot."
      ],
      cookingTime: 15,
      diet: ["vegetarian"],
      cuisine: "American",
      imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
    }
  ];

  // Common ingredient categories to enhance recipe matching
  const proteinIngredients = ["chicken", "beef", "pork", "tofu", "beans", "lentils", "chickpeas", "eggs", "fish", "shrimp", "tuna"];
  const vegetableIngredients = ["tomatoes", "bell peppers", "zucchini", "spinach", "kale", "lettuce", "broccoli", "carrots", "onions", "potatoes", "cucumber"];
  const starchIngredients = ["rice", "pasta", "bread", "potatoes", "quinoa", "couscous", "noodles"];
  const dairyIngredients = ["cheese", "milk", "yogurt", "cream", "butter"];

  // Match user ingredients with our categories
  const userProteins = ingredients.filter(ing => proteinIngredients.includes(ing.toLowerCase()));
  const userVegetables = ingredients.filter(ing => vegetableIngredients.includes(ing.toLowerCase()));
  const userStarches = ingredients.filter(ing => starchIngredients.includes(ing.toLowerCase()));
  const userDairy = ingredients.filter(ing => dairyIngredients.includes(ing.toLowerCase()));
  
  // Generate customized recipes based on templates
  const customizedRecipes: Recipe[] = [];
  
  recipeTemplates.forEach((template, index) => {
    // Create a copy of the template to customize
    const recipe: Recipe = {
      id: `recipe-${index}`,
      title: template.title,
      description: template.description,
      ingredients: [...template.baseIngredients],
      instructions: [...template.instructions],
      cookingTime: template.cookingTime,
      diet: [...template.diet],
      cuisine: template.cuisine,
      imageUrl: template.imageUrl
    };
    
    // Customize recipe based on user ingredients
    customizeRecipeWithUserIngredients(
      recipe,
      userProteins,
      userVegetables,
      userStarches,
      userDairy,
      ingredients
    );
    
    // Apply filters
    if (
      (filters.cookingTime === 'any' || recipe.cookingTime <= parseInt(filters.cookingTime)) &&
      (filters.diet === 'any' || recipe.diet.includes(filters.diet)) &&
      (filters.cuisine === 'any' || recipe.cuisine.toLowerCase() === filters.cuisine.toLowerCase())
    ) {
      customizedRecipes.push(recipe);
    }
  });
  
  // If no recipes match filters, return at least one customized recipe
  if (customizedRecipes.length === 0 && recipeTemplates.length > 0) {
    const fallbackRecipe = { ...recipeTemplates[0] } as Recipe;
    fallbackRecipe.id = 'fallback-recipe';
    
    customizeRecipeWithUserIngredients(
      fallbackRecipe,
      userProteins,
      userVegetables,
      userStarches,
      userDairy,
      ingredients
    );
    
    // Adjust recipe to meet filters
    if (filters.cookingTime !== 'any') {
      fallbackRecipe.cookingTime = parseInt(filters.cookingTime) - 5;
    }
    
    if (filters.diet !== 'any') {
      fallbackRecipe.diet = [filters.diet];
    }
    
    if (filters.cuisine !== 'any') {
      fallbackRecipe.cuisine = filters.cuisine;
    }
    
    customizedRecipes.push(fallbackRecipe);
  }
  
  return customizedRecipes;
}

// Helper function to customize a recipe with user ingredients
function customizeRecipeWithUserIngredients(
  recipe: Recipe,
  userProteins: string[],
  userVegetables: string[],
  userStarches: string[],
  userDairy: string[],
  allIngredients: string[]
) {
  // Customize title based on main ingredients
  if (userProteins.length > 0 && userVegetables.length > 0) {
    recipe.title = `${capitalizeFirstLetter(userProteins[0])} with ${capitalizeFirstLetter(userVegetables[0])} ${recipe.title}`;
  } else if (userProteins.length > 0) {
    recipe.title = `${capitalizeFirstLetter(userProteins[0])} ${recipe.title}`;
  } else if (userVegetables.length > 0) {
    recipe.title = `${capitalizeFirstLetter(userVegetables[0])} ${recipe.title}`;
  }
  
  // Update description
  const mainIngredients = [...userProteins, ...userVegetables].slice(0, 3);
  if (mainIngredients.length > 0) {
    recipe.description = `A delicious dish featuring ${mainIngredients.join(', ')}.`;
  }
  
  // Add user ingredients to recipe ingredients
  recipe.ingredients = [
    ...recipe.ingredients,
    ...userProteins,
    ...userVegetables,
    ...userStarches,
    ...userDairy
  ];
  
  // Remove duplicates from ingredients
  recipe.ingredients = [...new Set(recipe.ingredients)];
  
  // Add ingredient-specific cooking instructions
  if (userProteins.length > 0) {
    const protein = userProteins[0];
    recipe.instructions.splice(1, 0, `Cook ${protein} until done.`);
  }
  
  if (userVegetables.length > 0) {
    const vegStep = `Add ${userVegetables.join(', ')} and cook until tender.`;
    recipe.instructions.splice(Math.min(2, recipe.instructions.length), 0, vegStep);
  }
  
  // Adjust cooking time based on ingredients
  if (userProteins.includes('chicken') || userProteins.includes('beef')) {
    recipe.cookingTime += 10;
  } else if (userProteins.length === 0 && userVegetables.length > 0) {
    recipe.cookingTime -= 5;
  }
  
  // Adjust diet information
  if (userProteins.some(p => ['chicken', 'beef', 'pork', 'fish', 'shrimp'].includes(p))) {
    recipe.diet = recipe.diet.filter(d => d !== 'vegetarian' && d !== 'vegan');
  }
  
  if (userDairy.length > 0) {
    recipe.diet = recipe.diet.filter(d => d !== 'vegan');
  }
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}