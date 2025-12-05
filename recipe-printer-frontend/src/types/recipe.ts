export interface Instruction {
  step: number;
  title: string;
  text: string;
}

export interface RecipeData {
  title: string;
  servings: string;
  prepTime: string;
  cookTime: string;
  ingredients: string[];
  instructions: Instruction[];
  tips: string;
  imageUrl: string;
}
