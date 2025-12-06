import { useState } from 'react';
import RecipePage from './RecipePage';
import Sidebar from './components/Layout/Sidebar';
import { initialRecipe } from './data/initialRecipe';
import type { RecipeData } from './types/recipe';

function App() {
  const [recipe, setRecipe] = useState<RecipeData>(initialRecipe);

  const handleRecipeDrafted = (newRecipe: RecipeData) => {
    setRecipe(newRecipe);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onRecipeDrafted={handleRecipeDrafted} />
      <RecipePage recipe={recipe} onRecipeChange={setRecipe} />
    </div>
  )
}

export default App