import type { RecipeData } from "../types/recipe";

export const carbonaraRecipe: RecipeData = {
  title: "Classic Spaghetti Carbonara",
  servings: "4",
  prepTime: "10 Min",
  cookTime: "15 Min",
  ingredients: [
    "12 oz spaghetti",
    "4 large eggs",
    "1 cup grated Pecorino Romano cheese",
    "1/2 lb guanciale or pancetta, diced",
    "Freshly cracked black pepper",
    "Salt (for pasta water)",
  ],
  instructions: [
    {
      step: 1,
      title: "Boil the water:",
      text: "Bring a large pot of salted water to a boil.",
    },
    {
      step: 2,
      title: "Cook the meat:",
      text: "While the water heats, sauté the guanciale (or pancetta) in a large skillet over medium heat until crispy and the fat has rendered. Remove from heat and set aside.",
    },
    {
      step: 3,
      title: "Prepare the sauce:",
      text: "In a medium bowl, whisk together the eggs and grated Pecorino Romano cheese until well combined. Season generously with black pepper.",
    },
    {
      step: 4,
      title: "Cook the pasta:",
      text: "Add the spaghetti to the boiling water and cook until al dente. Reserve 1 cup of the starchy pasta water, then drain the pasta.",
    },
    {
      step: 5,
      title: "Combine:",
      text: "Add the hot pasta directly to the skillet with the guanciale. Toss to coat in the fat. Remove the skillet from the heat completely (crucial step to avoid scrambling the eggs).",
    },
    {
      step: 6,
      title: "Creamify:",
      text: "Pour the egg and cheese mixture over the pasta, tossing quickly and continuously. Add small splashes of the reserved pasta water as needed to create a creamy, glossy emulsion.",
    },
    {
      step: 7,
      title: "Serve:",
      text: "Serve immediately, topped with extra cheese and more freshly cracked black pepper.",
    },
  ],
  tips: "Use room temperature eggs to help the emulsion form more easily. Never add the egg mixture while the pan is on the heat, or you'll end up with scrambled eggs instead of a sauce.",
  imageUrl:
    "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Placeholder image
};
