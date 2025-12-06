import type { RecipeData } from "../types/recipe";
import { carbonaraRecipe } from "../data/carbonaraRecipe";

export const extractRecipeFromVideo = async (url: string): Promise<RecipeData> => {
  console.log(`Simulating AI extraction for: ${url}`);
  
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return carbonaraRecipe;
};
