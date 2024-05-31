import { createElement } from "react";

import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import parse from "rehype-parse";
import rehypeReact from "rehype-react";
import breaks from "remark-breaks";
import { unified } from "unified";

import type { WithAny, WithClassName } from "@/types/common";

// Renders the markdown content using `unified` and `rehype-react`.
const renderer = unified()
  .use(parse)
  .use(breaks)
  // @ts-ignore
  .use(rehypeReact, { createElement: createElement });

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    ...theme.typography.body1,
    ...theme.typography.body2,
    ...theme.typography.h2,
    ...theme.typography.h3,
    ...theme.typography.h4,
    ...theme.typography.h5,
    ...theme.typography.h6,
    "& p": {
      ...theme.typography.body1,
    },
    "& a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
    "& li": {
      ...theme.typography.body1,
      marginBottom: theme.spacing(3),
    },
    "& strong, b": {
      fontWeight: 600,
    },
  },
}));

export type MarkdownFeatureProps = WithAny &
  WithClassName & {
    text: string;
  };

/**
 * Renders the markdown feature component.
 * @param {MarkdownFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const MarkdownFeature = (props: MarkdownFeatureProps) => {
  const { className, text, ...rest } = props;

  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      {(renderer.processSync(text) as any).result}
    </div>
  );
};

MarkdownFeature.displayName = "MarkdownFeature";

export default MarkdownFeature;
