import React from "react";
import type { RecipeData } from "../../types/recipe";

interface RecipeFooterProps {
  tips: string;
  isEditing: boolean;
  onInputChange: (field: keyof RecipeData, value: string) => void;
}

const RecipeFooter: React.FC<RecipeFooterProps> = ({
  tips,
  isEditing,
  onInputChange,
}) => {
  return (
    <footer className="mt-12 pt-8 border-t border-gray-100">
      <h3 className="text-lg font-serif font-semibold text-gray-800 mb-2">
        Tips and Variations
      </h3>
      {isEditing ? (
        <textarea
          value={tips}
          onChange={(e) => onInputChange("tips", e.target.value)}
          className="w-full text-gray-600 italic text-sm leading-relaxed border border-dashed border-gray-300 p-2 rounded focus:outline-none focus:border-gray-500 bg-transparent"
          rows={3}
        />
      ) : (
        <p className="text-gray-600 italic text-sm leading-relaxed">{tips}</p>
      )}
    </footer>
  );
};

export default RecipeFooter;
