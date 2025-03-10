// Capitalizes the first letter of a string while keeping the rest unchanged.
// Useful for generating labels from lowercase values without modifying the original value.
// Example: capitalize("male") → "Male", capitalize("female") → "Female"

export const capitalize = (str: string) =>
  str.replace(/^\w/, (c) => c.toUpperCase());
