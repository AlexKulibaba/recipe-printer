import React from "react";
import type { Instruction } from "../../types/recipe";

interface InstructionListProps {
  instructions: Instruction[];
  isEditing: boolean;
  onInstructionChange: (
    index: number,
    field: keyof Instruction,
    value: string | number
  ) => void;
  onAddInstruction: () => void;
  onRemoveInstruction: (index: number) => void;
}

const InstructionList: React.FC<InstructionListProps> = ({
  instructions,
  isEditing,
  onInstructionChange,
  onAddInstruction,
  onRemoveInstruction,
}) => {
  return (
    <section className="md:col-span-8 pt-8 md:pt-0 pl-0 md:pl-4">
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2 inline-block">
        Instructions
      </h2>

      <div className="space-y-6">
        {instructions.map((instruction, index) => (
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
                      onInstructionChange(index, "title", e.target.value)
                    }
                    className="font-bold text-gray-900 border-b border-gray-300 focus:border-gray-500 focus:outline-none bg-transparent"
                  />
                  <textarea
                    placeholder="Step description..."
                    value={instruction.text}
                    onChange={(e) =>
                      onInstructionChange(index, "text", e.target.value)
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
                onClick={() => onRemoveInstruction(index)}
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
          onClick={onAddInstruction}
          className="mt-6 text-sm font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1"
        >
          + Add Step
        </button>
      )}
    </section>
  );
};

export default InstructionList;
