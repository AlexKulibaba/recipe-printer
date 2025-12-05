export const parseIngredient = (line: string) => {
  // Regex to match: (quantity) (unit)? (ingredient name)
  // Examples: "2 cups flour", "1/2 tsp salt", "salt", "2 eggs"
  // This is a basic parser and might need refinement for complex cases
  const regex = /^((?:\d+\s?\/|[\d\.]+)\s?\d*)?\s?((?:tbsp|tsp|cup|oz|lb|g|kg|ml|l|clove|pinch|slice|piece|can|jar|package|bunch|sprig)s?)?\s+(.*)$/i;
  
  const match = line.match(regex);
  
  if (match) {
    return {
      amount: match[1] ? match[1].trim() : null,
      unit: match[2] ? match[2].trim() : null,
      name: match[3] ? match[3].trim() : line,
    };
  }
  
  return { amount: null, unit: null, name: line };
};

export const scaleIngredient = (line: string, scaleFactor: number): string => {
  const { amount, unit, name } = parseIngredient(line);
  
  if (!amount) return line; // No scalable amount found

  // Helper to convert fraction string to number
  const parseAmount = (amt: string): number => {
    if (amt.includes('/')) {
      const [num, den] = amt.split('/').map(Number);
      return num / den;
    }
    return parseFloat(amt);
  };

  // Helper to format number back to string (approximating fractions for common values could be added here)
  const formatAmount = (val: number): string => {
    // Simple formatting: allow up to 2 decimal places, strip trailing zeros
    return parseFloat(val.toFixed(2)).toString();
  };

  const originalValue = parseAmount(amount);
  const scaledValue = originalValue * scaleFactor;
  const formattedNewAmount = formatAmount(scaledValue);

  // Reconstruct the string
  // If there was a unit, include it. If not, just amount + space + name
  return `${formattedNewAmount}${unit ? ` ${unit}` : ''} ${name}`;
};
