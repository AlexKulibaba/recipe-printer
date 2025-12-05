import React from "react";

interface IngredientListProps {
  ingredients: string[];
  isEditing: boolean;
  onIngredientChange: (index: number, value: string) => void;
  onAddIngredient: () => void;
  onRemoveIngredient: (index: number) => void;
}

const IngredientList: React.FC<IngredientListProps> = ({
  ingredients,
  isEditing,
  onIngredientChange,
  onAddIngredient,
  onRemoveIngredient,
}) => {
  return (
    <aside className="md:col-span-4 bg-[#f9f1f0] p-6 md:p-8 rounded-lg h-full">
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2 inline-block">
        Ingredients
      </h2>
      <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="flex items-start gap-2 group">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => onIngredientChange(index, e.target.value)}
                  className="w-full bg-transparent border-b border-gray-300 focus:border-gray-500 focus:outline-none"
                />
                <button
                  onClick={() => onRemoveIngredient(index)}
                  className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove ingredient"
                >
                  ×
                </button>
              </>
            ) : (
              <span>{ingredient}</span>
            )}
          </li>
        ))}
      </ul>
      {isEditing && (
        <button
          onClick={onAddIngredient}
          className="mt-4 text-sm font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1"
        >
          + Add Ingredient
        </button>
      )}
    </aside>
  );
};

export default IngredientList;
