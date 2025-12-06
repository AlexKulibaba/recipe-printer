import React from "react";
import type { RecipeData } from "../../types/recipe";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface RecipeHeaderProps {
  title: string;
  servings: string;
  prepTime: string;
  cookTime: string;
  isEditing: boolean;
  onInputChange: (field: keyof RecipeData, value: string) => void;
  onUpdateServings: (delta: number) => void;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({
  title,
  servings,
  prepTime,
  cookTime,
  isEditing,
  onInputChange,
  onUpdateServings,
}) => {
  return (
    <header className="text-center mb-10">
      {isEditing ? (
        <Input
          type="text"
          value={title}
          onChange={(e) => onInputChange("title", e.target.value)}
          className="w-full text-center text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight border-b-2 border-dashed border-gray-400 rounded-none shadow-none focus-visible:ring-0 focus:border-gray-800 bg-transparent px-0 py-2 h-auto"
        />
      ) : (
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
          {title}
        </h1>
      )}

      {/* Metadata Row */}
      <div className="flex flex-wrap justify-center items-center gap-4 text-sm md:text-base text-gray-600 tracking-wide uppercase font-medium border-t border-b border-gray-200 py-4 mx-auto max-w-2xl">
        <div className="flex items-center gap-2">
          <span>Servings:</span>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateServings(-1)}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Decrease servings"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold">{servings}</span>
              <button
                onClick={() => onUpdateServings(1)}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Increase servings"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <span>{servings}</span>
          )}
        </div>

        <span className="hidden md:block text-gray-300">|</span>

        <div className="flex items-center gap-2">
          <span>Prep:</span>
          {isEditing ? (
            <Input
              type="text"
              value={prepTime}
              onChange={(e) => onInputChange("prepTime", e.target.value)}
              className="w-20 text-center border-b border-gray-400 rounded-none shadow-none focus-visible:ring-0 px-0 h-auto py-1 bg-transparent"
            />
          ) : (
            <span>{prepTime}</span>
          )}
        </div>

        <span className="hidden md:block text-gray-300">|</span>

        <div className="flex items-center gap-2">
          <span>Cook:</span>
          {isEditing ? (
            <Input
              type="text"
              value={cookTime}
              onChange={(e) => onInputChange("cookTime", e.target.value)}
              className="w-20 text-center border-b border-gray-400 rounded-none shadow-none focus-visible:ring-0 px-0 h-auto py-1 bg-transparent"
            />
          ) : (
            <span>{cookTime}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default RecipeHeader;
