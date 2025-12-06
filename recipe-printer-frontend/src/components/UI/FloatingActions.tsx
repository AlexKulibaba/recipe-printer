import React from "react";
import { Download, Loader2, Pencil, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingActionsProps {
  isEditing: boolean;
  isGenerating: boolean;
  onToggleEdit: () => void;
  onDownload: () => void;
}

const FloatingActions: React.FC<FloatingActionsProps> = ({
  isEditing,
  isGenerating,
  onToggleEdit,
  onDownload,
}) => {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 group/menu">
      <Button
        onClick={onToggleEdit}
        className="bg-white text-gray-900 p-4 rounded-full shadow-xl hover:bg-gray-50 transition-all duration-300 flex items-center border border-gray-200 group/btn h-auto"
        aria-label="Toggle Edit Mode"
      >
        {isEditing ? (
          <Eye className="w-6 h-6" />
        ) : (
          <Pencil className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
        )}
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover/menu:max-w-xs group-hover/menu:opacity-100 group-hover/menu:pl-2 transition-all duration-300 font-medium text-gray-900">
          {isEditing ? "View Mode" : "Edit Mode"}
        </span>
      </Button>

      <Button
        onClick={onDownload}
        disabled={isGenerating}
        className="bg-gray-900 text-white p-4 rounded-full shadow-xl hover:bg-gray-800 transition-all duration-300 flex items-center group/btn h-auto"
        aria-label="Download PDF"
      >
        {isGenerating ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <Download className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
        )}
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover/menu:max-w-xs group-hover/menu:opacity-100 group-hover/menu:pl-2 transition-all duration-300 font-medium">
          Download PDF
        </span>
      </Button>
    </div>
  );
};

export default FloatingActions;
