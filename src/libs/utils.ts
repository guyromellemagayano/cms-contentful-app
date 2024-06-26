export type OmitCustom<T, K> = Pick<T, Exclude<keyof T, K>>;

export type OmitRecursive<T, K> = OmitCustom<
  { [P in keyof T]: OmitDistributive<T[P], K> },
  K
>;

export type OmitDistributive<T, K> = T extends any
  ? T extends object
    ? Id<OmitRecursive<T, K>>
    : T
  : never;

export type Id<T> = Record<string, never> & { [P in keyof T]: T[P] };

export type CnProps = Array<any>;

/**
 * Combines multiple class names into a single string, filtering out any falsy values.
 * @param classes - The class names to combine.
 * @returns A string containing the combined class names.
 */
export const cn = (...classes: CnProps) => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Executes the provided expression and returns its value if it is not null or undefined.
 * If an error occurs during the execution of the expression, the default value is returned.
 * @template T - The type of the value returned by the expression.
 * @param {() => T} exp - The expression to execute.
 * @param {T | undefined | null} [d=undefined] - The default value to return if the expression is null or undefined.
 * @returns The value returned by the expression, or the default value if the expression is null or undefined.
 */
export const tryGet = <T>(
  exp: () => T,
  d: T | undefined | null = undefined
): T | undefined | null => {
  const val = exp();

  if (val !== null) {
    return val;
  }

  return d;
};

/**
 * Optimizes line breaks in a string by replacing the last space with a non-breaking space.
 * @param str - The input string to optimize.
 * @returns The optimized string with a non-breaking space.
 */
export const optimizeLineBreak = (str: string): string => {
  const tokens = str?.split(" ") ?? [];

  if (tokens && tokens?.length < 3) {
    return str;
  }

  const lastToken = tokens.pop();

  return `${tokens.join(" ")}\u00A0${lastToken}`;
};

export type GetLinkDisplayTextProps = {
  pageName?: string;
  categoryName?: string;
  postName?: string;
  slug?: string;
  sys?: GetLinkDisplayTextSysProps;
};

export type GetLinkDisplayTextSysProps = {
  id: string;
};

/**
 * Retrieves the display text for a link based on the provided props.
 * @param {GetLinkDisplayTextProps} props - The properties to retrieve the display text with.
 * @returns The display text for the link.
 */
export const getLinkDisplayText = (props: GetLinkDisplayTextProps): string => {
  const { pageName, categoryName, postName, slug, sys } = props;

  if (pageName && pageName?.length > 0) {
    return pageName;
  }

  if (categoryName && categoryName?.length > 0) {
    return categoryName;
  }

  if (postName && postName?.length > 0) {
    return postName;
  }

  return slug && slug?.length > 0 ? slug : "";
};

export type GetLinkHrefPrefixProps = GetLinkDisplayTextProps;

/**
 * Returns the href prefix based on the provided props.
 * @param {GetLinkHrefPrefixProps} props - The properties to retrieve the href prefix with.
 * @returns The href prefix.
 */
export const getLinkHrefPrefix = (props: GetLinkHrefPrefixProps): string => {
  const { pageName, categoryName, postName, slug, sys } = props;

  if (pageName && pageName?.length > 0 && slug && slug?.length > 0) {
    return `/${slug}`;
  }

  if (categoryName && categoryName?.length > 0 && slug && slug?.length > 0) {
    return `/category/${slug}`;
  }

  if (postName && postName?.length > 0 && slug && slug?.length > 0) {
    return `/post/${slug}`;
  }

  return slug && slug?.length > 0 ? `/${slug}` : "";
};
