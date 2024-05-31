import type { InspectorModeTags } from "@contentful/live-preview/dist/inspectorMode/types";
import { Theme, Typography, TypographyProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

import { MarkdownFeature } from "@/components/features/markdown";
import type { WithAny, WithClassName } from "@/types/common";

const useStyles = makeStyles((theme: Theme) => ({
  containerCentered: {
    textAlign: "center",
  },
  headline: {
    fontSize: "2.25rem",
    fontWeight: 600,
    lineHeight: 1.083,
  },
  subline: {
    fontWeight: 400,
    lineHeight: 1.56,
    marginTop: theme.spacing(6),
    fontSize: "1.8rem",
    color: "#414D63",
  },

  text: {
    "& p": {
      fontSize: "2.5rem",
      lineHeight: 1.52,
    },
  },
}));

export type SectionHeadlinesFeatureProps = WithAny &
  WithClassName & {
    headline?: string | null;
    headlineProps?: TypographyProps;
    headlineLivePreviewProps?: InspectorModeTags;
    subline?: string | null;
    sublineProps?: TypographyProps;
    sublineLivePreviewProps?: InspectorModeTags;
    body?: string | null;
    align?: "center" | "left";
  };

/**
 * Renders the section headlines feature component.
 * @param {SectionHeadlinesFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const SectionHeadlinesFeature = (props: SectionHeadlinesFeatureProps) => {
  const {
    headline,
    headlineProps = {},
    headlineLivePreviewProps = {},
    subline,
    sublineProps = {},
    sublineLivePreviewProps = {},
    body,
    align = "center",
    className = "",
    ...rest
  } = props;

  const computedHeadlineProps: TypographyProps = {
    variant: "h1",
    component: "h2",
    ...headlineProps,
    ...headlineLivePreviewProps,
    className: clsx(headlineProps.className, classes.headline),
  };
  const computedSublineProps: TypographyProps = {
    variant: "h3",
    ...sublineProps,
    ...sublineLivePreviewProps,
    className: clsx(sublineProps.className, classes.subline),
  };

  const classes = useStyles();

  if (!headline && !subline && !body) {
    return null;
  }

  return (
    <div
      className={clsx(
        align === "center" ? classes.containerCentered : null,
        className
      )}
      {...rest}
    >
      {headline && headline?.length > 0 && (
        <Typography {...computedHeadlineProps}>{headline}</Typography>
      )}

      {subline && subline?.length > 0 && (
        <Typography {...computedSublineProps}>{subline}</Typography>
      )}

      {body && body?.length > 0 && (
        <MarkdownFeature text={body} className={classes.text} />
      )}
    </div>
  );
};

SectionHeadlinesFeature.displayName = "SectionHeadlinesFeature";

export default SectionHeadlinesFeature;
