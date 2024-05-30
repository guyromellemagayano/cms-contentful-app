"use client";

import { useMemo } from "react";

import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import { Container, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

import { RichtextCtfComponentFeature } from "@/components/features/ctf-components/richtext";
import type { WithAny } from "@/types/common";

import type { BusinessInfoFieldsFragment } from "./__generated/business-info-ctf-component-feature.generated";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: theme.spacing(18),
    paddingTop: (props: BusinessInfoFieldsFragment) =>
      props.name || props.shortDescription ? 0 : theme.spacing(18),
    "& .MuiContainer-root + .ComponentInfoBlock": {
      marginTop: theme.spacing(18),
    },
    "& .ComponentInfoBlock + .MuiContainer-root": {
      marginTop: theme.spacing(18),
    },
  },
  container: {
    marginRight: "auto",
    marginLeft: "auto",
    maxWidth: "126.2rem",
  },
  containerNarrow: {
    marginRight: "auto",
    marginLeft: "auto",
    maxWidth: "77rem",
  },
  hero: {
    marginBottom: theme.spacing(18),
    position: "relative",
  },
  heroBg: {
    backgroundColor: "#000",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    "&::before": {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      bottom: 0,
      content: '""',
      display: "block",
      left: 0,
      position: "absolute",
      right: 0,
      top: 0,
      zIndex: 1,
    },
  },
  heroInner: {
    alignItems: "center",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: "55rem",
    paddingBottom: theme.spacing(8),
    paddingTop: theme.spacing(8),
    position: "relative",
    textAlign: "center",
    zIndex: 1,
    [theme.breakpoints.up("md")]: {
      paddingBottom: theme.spacing(16),
      paddingTop: theme.spacing(16),
    },
    "@media (min-height: 600px)": {
      minHeight: "59rem",
    },
  },
  title: {
    [theme.breakpoints.up("md")]: {
      fontSize: "4.5rem",
    },
  },
  subtitle: {
    fontSize: "2.5rem",
    marginTop: theme.spacing(3),
  },
}));

export type BusinessInfoCtfComponentFeatureProps = WithAny &
  BusinessInfoFieldsFragment;

/**
 * Renders the business info `contentful` feature component.
 * @param {BusinessInfoCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `contentful` feature component.
 */
const BusinessInfoCtfComponentFeature = (
  props: BusinessInfoCtfComponentFeatureProps
) => {
  const {
    body,
    name,
    shortDescription,
    featuredImage,
    sys: { id },
    ...rest
  } = props;

  const backgroundImage = useMemo(
    () =>
      featuredImage?.url && featuredImage?.url?.length > 0
        ? `${featuredImage.url}?w=1920`
        : undefined,
    [featuredImage]
  );
  const classes = useStyles(props);
  const inspectorMode = useContentfulInspectorMode({ entryId: id });

  return (
    <div className={classes.root} {...rest}>
      {((name && name?.length > 0) ||
        (shortDescription && shortDescription?.length > 0)) && (
        <div className={classes.hero}>
          <div
            className={classes.heroBg}
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
            {...inspectorMode({
              fieldId: "featuredImage",
            })}
          />

          <Container maxWidth={false}>
            <div className={clsx(classes.containerNarrow, classes.heroInner)}>
              {name && name?.length > 0 && (
                <Typography
                  variant="h1"
                  className={classes.title}
                  {...inspectorMode({
                    fieldId: "name",
                  })}
                >
                  {name}
                </Typography>
              )}

              {shortDescription && shortDescription?.length > 0 && (
                <Typography
                  className={classes.subtitle}
                  {...inspectorMode({
                    fieldId: "shortDescription",
                  })}
                >
                  {shortDescription}
                </Typography>
              )}
            </div>
          </Container>
        </div>
      )}

      {body && Object.keys(body)?.length > 0 && (
        <div
          {...inspectorMode({
            fieldId: "body",
          })}
        >
          <RichtextCtfComponentFeature
            containerClassName={classes.container}
            gridClassName={classes.containerNarrow}
            {...body}
          />
        </div>
      )}
    </div>
  );
};

BusinessInfoCtfComponentFeature.displayName = "BusinessInfoCtfComponentFeature";

export default BusinessInfoCtfComponentFeature;
