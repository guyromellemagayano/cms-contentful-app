"use client";

import { useMemo } from "react";

import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import { Container, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

import { RichtextCtfComponentFeature } from "@/components/features/ctf-components/richtext";
import { PageLinkFeature } from "@/components/features/page-link";
import { LayoutContext, layoutContextValues } from "@/contexts/layout";
import { useLayoutContext } from "@/hooks/layout";
import {
  THEME_HEADER_HEIGHT,
  THEME_HEADER_HEIGHT_MD,
  getColorConfigFromPalette,
} from "@/theme";
import type { WithAny } from "@/types/common";

import type { HeroBannerFieldsFragment } from "./__generated/hero-banner-ctf-component-feature.generated";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    overflow: "hidden",
    position: "relative",
  },
  fullScreen: {
    minHeight: `calc(100vh - ${THEME_HEADER_HEIGHT_MD})`,
    [theme.breakpoints.up("md")]: {
      minHeight: `calc(100vh - ${THEME_HEADER_HEIGHT})`,
    },
    "@media (min-height: 91.2em)": {
      minHeight: "91.2rem",
    },
  },
  innerContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "125.8rem",
    padding: theme.spacing(33, 0, 33),
    position: "relative",
    width: "100%",
    "@media (min-height: 91.2em)": {
      padding: theme.spacing(39, 0, 39),
    },
  },
  partialBgContainer: {
    display: "none",
    height: "100%",
    left: "50%",
    maxWidth: "192rem",
    position: "absolute",
    top: 0,
    transform: "translateX(-50%)",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  partialBg: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
    position: "absolute",
    right: 0,
    top: 0,
    width: "50%",
  },
  headline: {
    fontSize: "3rem",
    fontWeight: 800,
    lineHeight: 1.08,
    maxWidth: "44rem",
    [theme.breakpoints.up("xl")]: {
      fontSize: "3.8rem",
    },
  },
  body: {
    fontWeight: 400,
    lineHeight: 1.56,
    marginTop: theme.spacing(6),
    maxWidth: "46.9rem",
    "& p": {
      fontSize: "2.5rem",
      [theme.breakpoints.up("xl")]: {
        fontSize: "2.5rem",
      },
    },
  },
  ctaContainer: {
    marginTop: theme.spacing(6),
  },
}));

export type HeroBannerCtfComponentFeatureProps = WithAny &
  HeroBannerFieldsFragment;

/**
 * Renders the hero banner `contentful` feature component.
 * @param {HeroBannerCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `contentful` feature component.
 */
const HeroBannerCtfComponentFeature = (
  props: HeroBannerCtfComponentFeatureProps
) => {
  const {
    image,
    imageStyle: imageStyleBoolean,
    headline,
    bodyText,
    ctaText,
    targetPage,
    colorPalette,
    sys: { id },
    heroSize: heroSizeBoolean,
    ...rest
  } = props;

  const colorConfig = getColorConfigFromPalette(
    colorPalette && colorPalette?.length > 0 ? colorPalette : ""
  );
  const imageStyle = imageStyleBoolean ? "partial" : "full",
    heroSize =
      !heroSizeBoolean || heroSizeBoolean ? "full_screen" : "fixed_height";

  const layout = useLayoutContext();
  const backgroundImage = useMemo(
    () =>
      image?.url && image?.url?.length > 0
        ? `${image.url}?w=${
            imageStyle === "partial" ? 767 * 2 : layout.containerWidth * 2
          }`
        : undefined,
    [image, imageStyle, layout.containerWidth]
  );
  const classes = useStyles();
  const inspectorMode = useContentfulInspectorMode({ entryId: id });

  return (
    <Container
      maxWidth={false}
      className={clsx(
        classes.root,
        heroSize === "full_screen" ? classes.fullScreen : null
      )}
      {...inspectorMode({
        fieldId: "image",
      })}
      style={{
        backgroundImage:
          imageStyle === "full" && backgroundImage
            ? `url(${backgroundImage!})`
            : undefined,
        backgroundColor: colorConfig.backgroundColor,
      }}
      {...rest}
    >
      {imageStyle === "partial" &&
        backgroundImage &&
        backgroundImage?.length > 0 && (
          <div className={classes.partialBgContainer}>
            <div
              className={classes.partialBg}
              style={{
                backgroundImage: `url(${backgroundImage!})`,
              }}
            />
          </div>
        )}

      <div className={classes.innerContainer}>
        {headline && headline?.length > 0 && (
          <Typography
            variant="h1"
            className={classes.headline}
            style={{ color: colorConfig.headlineColor }}
            {...inspectorMode({
              fieldId: "headline",
            })}
          >
            {headline}
          </Typography>
        )}

        {bodyText && Object.keys(bodyText)?.length > 0 && (
          <LayoutContext.Provider
            value={{ ...layoutContextValues, parent: "hero-banner-body" }}
          >
            <div
              style={{ color: colorConfig.textColor }}
              {...inspectorMode({
                fieldId: "bodyText",
              })}
            >
              <RichtextCtfComponentFeature
                className={classes.body}
                {...bodyText}
              />
            </div>
          </LayoutContext.Provider>
        )}

        {targetPage &&
          Object.keys(targetPage)?.length > 0 &&
          ctaText &&
          ctaText?.length > 0 && (
            <div className={classes.ctaContainer}>
              <PageLinkFeature
                page={targetPage}
                variant="contained"
                color={colorConfig.buttonColor}
                isButton
              >
                {ctaText}
              </PageLinkFeature>
            </div>
          )}
      </div>
    </Container>
  );
};

HeroBannerCtfComponentFeature.displayName = "HeroBannerCtfComponentFeature";

export default HeroBannerCtfComponentFeature;
