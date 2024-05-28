export type CnProps = Array<any>;

/**
 * Combines multiple class names into a single string, filtering out any falsy values.
 * @param classes - The class names to combine.
 * @returns A string containing the combined class names.
 */
export const cn = (...classes: CnProps) => {
  return classes.filter(Boolean).join(" ");
};
