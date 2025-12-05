import type { RecipeData } from "../types/recipe";

export const initialRecipe: RecipeData = {
  title: "Zesty Lemon Garlic Shrimp Pasta",
  servings: "4",
  prepTime: "15 Min",
  cookTime: "20 Min",
  ingredients: [
    "8 oz linguine pasta",
    "2 tbsp olive oil",
    "1 lb large shrimp, peeled and deveined",
    "Salt to taste",
    "Black pepper to taste",
    "1 tbsp minced garlic",
    "1 tsp red pepper flakes",
    "1/2 cup chicken broth",
    "1 cup fresh lemon juice",
    "Zest of 1 lemon",
    "1/2 cup finely chopped fresh parsley",
    "Grated Parmesan cheese for serving",
  ],
  instructions: [
    {
      step: 1,
      title: "Cook the pasta:",
      text: "Bring a large pot of salted water to a boil. Add the linguine and cook until al dente, according to the package instructions. Drain and set aside.",
    },
    {
      step: 2,
      title: "Prepare the shrimp:",
      text: "Meanwhile, heat the olive oil in a large skillet over medium-high heat. Add the shrimp, season with salt and pepper, and sauté until they turn pink, about 2-3 minutes per side. Remove the shrimp from the skillet and set aside.",
    },
    {
      step: 3,
      title: "Make the sauce:",
      text: "In the same skillet, add the minced garlic and red pepper flakes. Cook until the garlic is fragrant, about 1 minute. Stir in the chicken broth, lemon juice, and lemon zest. Bring the mixture to a simmer and cook for about 5 minutes, or until the sauce has reduced by half.",
    },
    {
      step: 4,
      title: "Combine the pasta and shrimp with the sauce:",
      text: "Return the shrimp to the skillet. Add the cooked pasta and toss to combine, making sure the pasta is well-coated with the sauce.",
    },
    {
      step: 5,
      title: "Serve:",
      text: "Remove the skillet from the heat. Sprinkle with the chopped fresh parsley and grated Parmesan cheese. Serve immediately.",
    },
  ],
  tips: "For an extra punch of flavor, add a splash of white wine to the sauce. Feel free to add more vegetables like cherry tomatoes or spinach for added nutrition. Use whole grain pasta for a healthier twist.",
  imageUrl:
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
};
