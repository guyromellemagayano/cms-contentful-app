import MuiButton from "@mui/material/Button";
import MuiLink from "@mui/material/Link";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import queryString from "query-string";

import { WithAny, WithChildrenAndClassName } from "@/types/common";

const useStyles = makeStyles(() => ({
  baseAnchor: {
    display: "block",
    color: "inherit",
    textDecoration: "none",
  },
}));

export type LinkSharedProps = WithAny &
  WithChildrenAndClassName & {
    href?: string;
    as?: string;
    target?: string;
    dropUrlParams?: boolean;
    className?: string;
    withoutMaterial?: boolean;
    underline?: boolean;
    onClick?: () => any;
    isButton?: boolean;
    variant?: "text" | "outlined" | "contained" | undefined;
    size?: "small" | "medium" | "large" | undefined;
    color?: any;
    startIcon?: any;
    endIcon?: any;
    urlParams?: string;
    title?: string;
  };

/**
 * Renders the shared link component for the `contentful` API to consume.
 * @param href - The URL to link to.
 * @param as - The URL to link to.
 * @param target - The target attribute value.
 * @param dropUrlParams - Indicates whether to drop URL parameters or not.
 * @param className - The class name to apply.
 * @param children - The children components.
 * @param withoutMaterial - Indicates whether to render without material or not.
 * @param underline - Indicates whether to underline the link or not.
 * @param onClick - The function to handle click event.
 * @param isButton - Indicates whether to render as a button or not.
 * @param variant - The button variant to apply.
 * @param size - The button size to apply.
 * @param color - The button color to apply.
 * @param startIcon - The start icon to apply.
 * @param endIcon - The end icon to apply.
 * @param urlParams - The URL parameters to apply.
 * @param title - The title attribute value.
 * @param rest - The rest of the properties to apply.
 * @returns The rendered component.
 */
const LinkShared = ({
  dropUrlParams,
  className,
  children,
  withoutMaterial,
  underline,
  onClick,
  isButton = false,
  variant,
  size,
  color,
  startIcon,
  endIcon,
  urlParams = "",
  title,
  target = "_self",
  as,
  href = "",
  ...rest
}: LinkSharedProps) => {
  let updatedHref = href;
  let updatedAs = as;

  const router = useRouter();
  const pathname = usePathname();
  const classes = useStyles();

  if (!dropUrlParams && router) {
    const urlQuerystring = pathname?.split("?")[1] || "";

    if (urlQuerystring && urlQuerystring?.length > 0) {
      updatedHref +=
        href.indexOf("?") < 0 ? `?${urlQuerystring}` : `&${urlQuerystring}`;
    }
  }

  if (urlParams && urlParams?.length > 0) {
    const parsedUrlParams = queryString.parse(urlParams);
    const parsedHref = queryString.parseUrl(href);
    const mergedParsedHref = {
      ...parsedHref,
      query: {
        ...parsedHref.query,
        ...parsedUrlParams,
      },
    };

    updatedHref = queryString.stringifyUrl(mergedParsedHref);

    if (as && as?.length > 0) {
      const parsedAs = queryString.parseUrl(as);
      const mergedParsedAs = {
        ...parsedAs,
        query: {
          ...parsedAs.query,
          ...parsedUrlParams,
        },
      };

      updatedAs = queryString.stringifyUrl(mergedParsedAs);
    }
  }

  if (!href) return <>{children}</>;

  const external = href.startsWith("http://") || href.startsWith("https://");
  const underlineStyle = underline ? "always" : "none";

  if (external || !href) {
    return isButton ? (
      <MuiButton
        href={href}
        className={className}
        color={color}
        onClick={() => onClick && onClick()}
        variant={variant}
        size={size}
        startIcon={startIcon}
        endIcon={endIcon}
        title={title}
        {...rest}
      >
        {children}
      </MuiButton>
    ) : (
      <MuiLink
        className={className}
        underline={underlineStyle}
        color={color}
        href={href}
        target={target}
        rel="noopener noreferrer"
        onClick={() => onClick && onClick()}
        title={title}
        {...rest}
      >
        {children}
      </MuiLink>
    );
  }

  if (withoutMaterial) {
    return (
      <Link
        href={href}
        as={as}
        className={clsx(classes.baseAnchor, className)}
        title={title}
        passHref
        {...rest}
      >
        {children}
      </Link>
    );
  }

  if (isButton) {
    return (
      <Link href={href} as={as} passHref {...rest}>
        <MuiButton
          href={as}
          className={className}
          color={color}
          onClick={() => onClick && onClick()}
          variant={variant}
          size={size}
          startIcon={startIcon}
          endIcon={endIcon}
          title={title}
        >
          {children}
        </MuiButton>
      </Link>
    );
  }

  return (
    <Link href={href} as={as} passHref {...rest}>
      <MuiLink
        href={as}
        className={className}
        underline={underlineStyle}
        color={color}
        onClick={() => onClick && onClick()}
        title={title}
      >
        {children}
      </MuiLink>
    </Link>
  );
};

LinkShared.displayName = "LinkShared";

export default LinkShared;
