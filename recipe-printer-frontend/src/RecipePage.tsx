import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Loader2, Pencil, Eye } from "lucide-react";

interface Instruction {
  step: number;
  title: string;
  text: string;
}

interface RecipeData {
  title: string;
  servings: string;
  prepTime: string;
  cookTime: string;
  ingredients: string[];
  instructions: Instruction[];
  tips: string;
  imageUrl: string;
}

const initialRecipe: RecipeData = {
  title: "Zesty Lemon Garlic Shrimp Pasta",
  servings: "4",
  prepTime: "15 Min",
  cookTime: "20 Min",
  ingredients: [
    "8 oz linguine pasta",
    "2 tbsp olive oil",
    "1 lb large shrimp, peeled and deveined",
    "Salt to taste",
    "Black pepper to taste",
    "1 tbsp minced garlic",
    "1 tsp red pepper flakes",
    "1/2 cup chicken broth",
    "1 cup fresh lemon juice",
    "Zest of 1 lemon",
    "1/2 cup finely chopped fresh parsley",
    "Grated Parmesan cheese for serving",
  ],
  instructions: [
    {
      step: 1,
      title: "Cook the pasta:",
      text: "Bring a large pot of salted water to a boil. Add the linguine and cook until al dente, according to the package instructions. Drain and set aside.",
    },
    {
      step: 2,
      title: "Prepare the shrimp:",
      text: "Meanwhile, heat the olive oil in a large skillet over medium-high heat. Add the shrimp, season with salt and pepper, and sauté until they turn pink, about 2-3 minutes per side. Remove the shrimp from the skillet and set aside.",
    },
    {
      step: 3,
      title: "Make the sauce:",
      text: "In the same skillet, add the minced garlic and red pepper flakes. Cook until the garlic is fragrant, about 1 minute. Stir in the chicken broth, lemon juice, and lemon zest. Bring the mixture to a simmer and cook for about 5 minutes, or until the sauce has reduced by half.",
    },
    {
      step: 4,
      title: "Combine the pasta and shrimp with the sauce:",
      text: "Return the shrimp to the skillet. Add the cooked pasta and toss to combine, making sure the pasta is well-coated with the sauce.",
    },
    {
      step: 5,
      title: "Serve:",
      text: "Remove the skillet from the heat. Sprinkle with the chopped fresh parsley and grated Parmesan cheese. Serve immediately.",
    },
  ],
  tips: "For an extra punch of flavor, add a splash of white wine to the sauce. Feel free to add more vegetables like cherry tomatoes or spinach for added nutrition. Use whole grain pasta for a healthier twist.",
  imageUrl:
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
};

const RecipePage: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [recipe, setRecipe] = useState<RecipeData>(initialRecipe);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    setIsGenerating(true);
    try {
      const element = printRef.current;
      const clone = element.cloneNode(true) as HTMLElement;

      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.top = "-9999px";
      container.style.left = "-9999px";
      container.style.width = "1000px";
      container.appendChild(clone);
      document.body.appendChild(container);

      clone.style.width = "100%";
      clone.style.margin = "0";
      clone.style.maxWidth = "none";
      clone.style.boxShadow = "none";

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 1000,
      });

      document.body.removeChild(container);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${recipe.title.toLowerCase().replace(/\s+/g, "-")}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

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
  React.useEffect(() => {
    return () => {
      if (recipe.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(recipe.imageUrl);
      }
    };
  }, [recipe.imageUrl]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans relative">
      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-white text-gray-900 p-4 rounded-full shadow-xl hover:bg-gray-50 transition-all duration-300 flex items-center group border border-gray-200"
          aria-label="Toggle Edit Mode"
        >
          {isEditing ? (
            <Eye className="w-6 h-6" />
          ) : (
            <Pencil className="w-6 h-6 group-hover:scale-110 transition-transform" />
          )}
          <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:pl-2 transition-all duration-300 font-medium">
            {isEditing ? "View Mode" : "Edit Mode"}
          </span>
        </button>

        <button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="bg-gray-900 text-white p-4 rounded-full shadow-xl hover:bg-gray-800 transition-all duration-300 flex items-center group"
          aria-label="Download PDF"
        >
          {isGenerating ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Download className="w-6 h-6 group-hover:scale-110 transition-transform" />
          )}
          <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:pl-2 transition-all duration-300 font-medium">
            Download PDF
          </span>
        </button>
      </div>

      {/* Printable Area */}
      <div
        className="max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden"
        ref={printRef}
      >
        {/* Hero Image Placeholder */}
        <div
          className="w-full h-64 md:h-80 bg-gray-300 bg-center bg-cover bg-no-repeat relative group"
          style={{
            backgroundImage: `url('${recipe.imageUrl}')`,
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
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>

        <div className="p-8 md:p-12">
          {/* Header Section */}
          <header className="text-center mb-10">
            {isEditing ? (
              <input
                type="text"
                value={recipe.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full text-center text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight border-b-2 border-dashed border-gray-400 focus:outline-none focus:border-gray-800 bg-transparent"
              />
            ) : (
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                {recipe.title}
              </h1>
            )}

            {/* Metadata Row */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm md:text-base text-gray-600 tracking-wide uppercase font-medium border-t border-b border-gray-200 py-4 mx-auto max-w-2xl">
              <div className="flex items-center gap-2">
                <span>Servings:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={recipe.servings}
                    onChange={(e) =>
                      handleInputChange("servings", e.target.value)
                    }
                    className="w-12 text-center border-b border-gray-400 focus:outline-none bg-transparent"
                  />
                ) : (
                  <span>{recipe.servings}</span>
                )}
              </div>

              <span className="hidden md:block text-gray-300">|</span>

              <div className="flex items-center gap-2">
                <span>Prep:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={recipe.prepTime}
                    onChange={(e) =>
                      handleInputChange("prepTime", e.target.value)
                    }
                    className="w-20 text-center border-b border-gray-400 focus:outline-none bg-transparent"
                  />
                ) : (
                  <span>{recipe.prepTime}</span>
                )}
              </div>

              <span className="hidden md:block text-gray-300">|</span>

              <div className="flex items-center gap-2">
                <span>Cook:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={recipe.cookTime}
                    onChange={(e) =>
                      handleInputChange("cookTime", e.target.value)
                    }
                    className="w-20 text-center border-b border-gray-400 focus:outline-none bg-transparent"
                  />
                ) : (
                  <span>{recipe.cookTime}</span>
                )}
              </div>
            </div>
          </header>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8">
            {/* Left Column: Ingredients */}
            <aside className="md:col-span-4 bg-[#f9f1f0] p-6 md:p-8 rounded-lg h-full">
              <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2 inline-block">
                Ingredients
              </h2>
              <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2 group">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={ingredient}
                          onChange={(e) =>
                            handleIngredientChange(index, e.target.value)
                          }
                          className="w-full bg-transparent border-b border-gray-300 focus:border-gray-500 focus:outline-none"
                        />
                        <button
                          onClick={() => handleRemoveIngredient(index)}
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
                  onClick={handleAddIngredient}
                  className="mt-4 text-sm font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1"
                >
                  + Add Ingredient
                </button>
              )}
            </aside>

            {/* Right Column: Instructions */}
            <section className="md:col-span-8 pt-8 md:pt-0 pl-0 md:pl-4">
              <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2 inline-block">
                Instructions
              </h2>

              <div className="space-y-6">
                {recipe.instructions.map((instruction, index) => (
                  <div className="flex gap-4 group relative" key={index}>
                    <span className="text-3xl font-serif font-bold text-gray-200 -mt-2">
                      {index + 1}
                    </span>
                    <div className="w-full">
                      {isEditing ? (
                        <div className="flex flex-col gap-2">
                          <input
                            type="text"
                            placeholder="Step Title (e.g., Cook the pasta)"
                            value={instruction.title}
                            onChange={(e) =>
                              handleInstructionChange(
                                index,
                                "title",
                                e.target.value
                              )
                            }
                            className="font-bold text-gray-900 border-b border-gray-300 focus:border-gray-500 focus:outline-none bg-transparent"
                          />
                          <textarea
                            placeholder="Step description..."
                            value={instruction.text}
                            onChange={(e) =>
                              handleInstructionChange(
                                index,
                                "text",
                                e.target.value
                              )
                            }
                            rows={2}
                            className="text-gray-800 leading-relaxed border border-gray-200 p-2 rounded focus:border-gray-500 focus:outline-none bg-transparent w-full"
                          />
                        </div>
                      ) : (
                        <p className="text-gray-800 leading-relaxed">
                          <span className="font-bold text-gray-900">
                            {instruction.title}
                          </span>{" "}
                          {instruction.text}
                        </p>
                      )}
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveInstruction(index)}
                        className="absolute -right-6 top-0 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity text-xl"
                        aria-label="Remove step"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <button
                  onClick={handleAddInstruction}
                  className="mt-6 text-sm font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1"
                >
                  + Add Step
                </button>
              )}
            </section>
          </div>

          {/* Footer: Tips and Variations */}
          <footer className="mt-12 pt-8 border-t border-gray-100">
            <h3 className="text-lg font-serif font-semibold text-gray-800 mb-2">
              Tips and Variations
            </h3>
            {isEditing ? (
              <textarea
                value={recipe.tips}
                onChange={(e) => handleInputChange("tips", e.target.value)}
                className="w-full text-gray-600 italic text-sm leading-relaxed border border-dashed border-gray-300 p-2 rounded focus:outline-none focus:border-gray-500 bg-transparent"
                rows={3}
              />
            ) : (
              <p className="text-gray-600 italic text-sm leading-relaxed">
                {recipe.tips}
              </p>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
