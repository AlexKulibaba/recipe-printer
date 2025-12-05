import React from "react";

interface RecipeHeroProps {
  imageUrl: string;
  isEditing: boolean;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RecipeHero: React.FC<RecipeHeroProps> = ({
  imageUrl,
  isEditing,
  onImageUpload,
}) => {
  return (
    <div
      className="w-full h-64 md:h-80 bg-gray-300 bg-center bg-cover bg-no-repeat relative group"
      style={{
        backgroundImage: `url('${imageUrl}')`,
      }}
      aria-label="Recipe Image"
    >
      {isEditing && (
        <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-bold cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
          Change Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageUpload}
          />
        </label>
      )}
    </div>
  );
};

export default RecipeHero;
