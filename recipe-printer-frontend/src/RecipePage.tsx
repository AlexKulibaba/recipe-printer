import React, { useRef, useState, useEffect } from "react";
import type { RecipeData, Instruction } from "./types/recipe";
import { useRecipePdf } from "./hooks/useRecipePdf";
import { scaleIngredient } from "./utils/recipeUtils";

import RecipeHero from "./components/Recipe/RecipeHero";
import RecipeHeader from "./components/Recipe/RecipeHeader";
import IngredientList from "./components/Recipe/IngredientList";
import InstructionList from "./components/Recipe/InstructionList";
import RecipeFooter from "./components/Recipe/RecipeFooter";
import FloatingActions from "./components/UI/FloatingActions";

interface RecipePageProps {
  recipe: RecipeData;
  onRecipeChange: (recipe: RecipeData) => void;
}

const RecipePage: React.FC<RecipePageProps> = ({ recipe, onRecipeChange }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  // Recipe state is now managed by the parent component

  const { handleDownloadPDF, isGenerating } = useRecipePdf(
    printRef,
    recipe.title
  );

  const handleInputChange = (field: keyof RecipeData, value: string) => {
    onRecipeChange({ ...recipe, [field]: value });
  };

  const handleUpdateServings = (delta: number) => {
    const currentServings = parseInt(recipe.servings) || 1;
    const newServings = Math.max(1, currentServings + delta);
    
    if (newServings === currentServings) return;

    const scaleFactor = newServings / currentServings;

    const newIngredients = recipe.ingredients.map((ing) =>
      scaleIngredient(ing, scaleFactor)
    );

    onRecipeChange({
      ...recipe,
      servings: newServings.toString(),
      ingredients: newIngredients,
    });
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    onRecipeChange({ ...recipe, ingredients: newIngredients });
  };

  const handleAddIngredient = () => {
    onRecipeChange({
      ...recipe,
      ingredients: [...recipe.ingredients, ""],
    });
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    onRecipeChange({ ...recipe, ingredients: newIngredients });
  };

  const handleInstructionChange = (
    index: number,
    field: keyof Instruction,
    value: string | number
  ) => {
    const newInstructions = [...recipe.instructions];
    newInstructions[index] = { ...newInstructions[index], [field]: value };
    onRecipeChange({ ...recipe, instructions: newInstructions });
  };

  const handleAddInstruction = () => {
    onRecipeChange({
      ...recipe,
      instructions: [
        ...recipe.instructions,
        { step: recipe.instructions.length + 1, title: "", text: "" },
      ],
    });
  };

  const handleRemoveInstruction = (index: number) => {
    const newInstructions = recipe.instructions.filter((_, i) => i !== index);
    // Recalculate step numbers
    const reindexedInstructions = newInstructions.map((inst, i) => ({
      ...inst,
      step: i + 1,
    }));
    onRecipeChange({ ...recipe, instructions: reindexedInstructions });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Revoke previous object URL if it exists
      if (recipe.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(recipe.imageUrl);
      }
      const newImageUrl = URL.createObjectURL(file);
      onRecipeChange({ ...recipe, imageUrl: newImageUrl });
    }
  };

  // Cleanup effect for object URLs
  useEffect(() => {
    return () => {
      if (recipe.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(recipe.imageUrl);
      }
    };
  }, [recipe.imageUrl]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans relative flex-1">
      <FloatingActions
        isEditing={isEditing}
        isGenerating={isGenerating}
        onToggleEdit={() => setIsEditing(!isEditing)}
        onDownload={handleDownloadPDF}
      />

      {/* Printable Area */}
      <div
        className="max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden"
        ref={printRef}
      >
        <RecipeHero
          imageUrl={recipe.imageUrl}
          isEditing={isEditing}
          onImageUpload={handleImageUpload}
        />

        <div className="p-8 md:p-12">
          <RecipeHeader
            title={recipe.title}
            servings={recipe.servings}
            prepTime={recipe.prepTime}
            cookTime={recipe.cookTime}
            isEditing={isEditing}
            onInputChange={handleInputChange}
            onUpdateServings={handleUpdateServings}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8">
            <IngredientList
              ingredients={recipe.ingredients}
              isEditing={isEditing}
              onIngredientChange={handleIngredientChange}
              onAddIngredient={handleAddIngredient}
              onRemoveIngredient={handleRemoveIngredient}
            />

            <InstructionList
              instructions={recipe.instructions}
              isEditing={isEditing}
              onInstructionChange={handleInstructionChange}
              onAddInstruction={handleAddInstruction}
              onRemoveInstruction={handleRemoveInstruction}
            />
          </div>

          <RecipeFooter
            tips={recipe.tips}
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
