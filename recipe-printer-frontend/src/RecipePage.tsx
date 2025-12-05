import React, { useRef, useState, useEffect } from "react";

import { initialRecipe } from "./data/initialRecipe";
import { useRecipePdf } from "./hooks/useRecipePdf";

import RecipeHero from "./components/Recipe/RecipeHero";
import RecipeHeader from "./components/Recipe/RecipeHeader";
import IngredientList from "./components/Recipe/IngredientList";
import InstructionList from "./components/Recipe/InstructionList";
import RecipeFooter from "./components/Recipe/RecipeFooter";
import FloatingActions from "./components/UI/FloatingActions";
import type { Instruction, RecipeData } from "./types/recipe";

const RecipePage: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [recipe, setRecipe] = useState<RecipeData>(initialRecipe);

  const { handleDownloadPDF, isGenerating } = useRecipePdf(
    printRef,
    recipe.title
  );

  const handleInputChange = (field: keyof RecipeData, value: string) => {
    setRecipe((prev) => ({ ...prev, [field]: value }));
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const handleAddIngredient = () => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const handleInstructionChange = (
    index: number,
    field: keyof Instruction,
    value: string | number
  ) => {
    const newInstructions = [...recipe.instructions];
    newInstructions[index] = { ...newInstructions[index], [field]: value };
    setRecipe((prev) => ({ ...prev, instructions: newInstructions }));
  };

  const handleAddInstruction = () => {
    setRecipe((prev) => ({
      ...prev,
      instructions: [
        ...prev.instructions,
        { step: prev.instructions.length + 1, title: "", text: "" },
      ],
    }));
  };

  const handleRemoveInstruction = (index: number) => {
    const newInstructions = recipe.instructions.filter((_, i) => i !== index);
    // Recalculate step numbers
    const reindexedInstructions = newInstructions.map((inst, i) => ({
      ...inst,
      step: i + 1,
    }));
    setRecipe((prev) => ({ ...prev, instructions: reindexedInstructions }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Revoke previous object URL if it exists
      if (recipe.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(recipe.imageUrl);
      }
      const newImageUrl = URL.createObjectURL(file);
      setRecipe((prev) => ({ ...prev, imageUrl: newImageUrl }));
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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans relative">
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
