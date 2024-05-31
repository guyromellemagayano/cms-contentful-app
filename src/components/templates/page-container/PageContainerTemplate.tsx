import { CSSProperties } from "@mui/material/styles/createTypography";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

import type { WithAny, WithChildren, WithClassName } from "@/types/common";

const useStyles = makeStyles(() => ({
  pageContainerRoot: {
    width: "100%",
  },
}));

export type PageContainerProps = WithAny &
  WithChildren &
  WithClassName & {
    style?: CSSProperties;
  };

/**
 * Renders the page container template component.
 * @param {PageContainerProps} props - The properties to render the component with.
 * @returns The rendered template component.
 */
const PageContainer = (props: PageContainerProps) => {
  const { className, style, children, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      style={style}
      className={clsx(classes.pageContainerRoot, className)}
      {...rest}
    >
      {children}
    </div>
  );
};

PageContainer.displayName = "PageContainer";

export default PageContainer;
