import React, { useState } from "react";
import { extractRecipeFromVideo } from "../../services/aiService";
import type { RecipeData } from "../../types/recipe";
import { Loader2, Wand2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  onRecipeDrafted: (recipe: RecipeData) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onRecipeDrafted }) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDraftRecipe = async () => {
    if (!url.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const recipe = await extractRecipeFromVideo(url);
      onRecipeDrafted(recipe);
    } catch (err) {
      console.error(err);
      setError("Failed to draft recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="w-80 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col p-6 print:hidden shadow-sm z-40">
      <div className="mb-8">
        <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
          <Wand2 className="w-6 h-6 text-purple-600" />
          AI Chef
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Paste a video URL to magically extract a recipe.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="video-url" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">
            Video URL
          </label>
          <Input
            id="video-url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/..."
            className="w-full border-gray-300 focus-visible:ring-purple-500"
          />
        </div>

        {error && (
          <p className="text-red-500 text-xs">{error}</p>
        )}

        <Button
          onClick={handleDraftRecipe}
          disabled={isLoading || !url.trim()}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Drafting...
            </>
          ) : (
            "Draft Recipe"
          )}
        </Button>
      </div>

      <div className="mt-auto pt-6 border-t border-gray-100">
         <div className="text-xs text-gray-400">
           <p>Tip: You can verify and edit the drafted recipe in the main view before downloading.</p>
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;
