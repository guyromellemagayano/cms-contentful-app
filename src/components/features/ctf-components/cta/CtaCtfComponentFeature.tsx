import { Container, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { RichtextCtfComponentFeature } from "@/components/features/ctf-components/richtext";
import { PageLinkFeature } from "@/components/features/page-link";
import { LayoutContext, layoutContextValues } from "@/contexts/layout";
import { optimizeLineBreak } from "@/libs/utils";
import { getColorConfigFromPalette } from "@/theme";
import type { WithAny } from "@/types/common";

import type { CtaFieldsFragment } from "./__generated/cta-ctf-component-feature.generated";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: "center",
  },
  innerContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "93.4rem",
    padding: theme.spacing(19, 0, 19),
  },
  headline: {
    fontWeight: "bold",
  },
  subline: {
    fontWeight: 400,
    lineHeight: 1.52,
    marginTop: theme.spacing(8),
  },
  ctaContainer: {
    marginTop: theme.spacing(8),
  },
}));

export type CtaCtfComponentFeatureProps = WithAny & CtaFieldsFragment;

/**
 * Renders the CTA `contentful` feature component.
 * @param {CtaCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `contentful` feature component.
 */
const CtaCtfComponentFeature = (props: CtaCtfComponentFeatureProps) => {
  const {
    headline,
    subline,
    targetPage,
    ctaText,
    colorPalette,
    urlParameters,
    ...rest
  } = props;

  const colorConfig = getColorConfigFromPalette(
    colorPalette && colorPalette?.length > 0 ? colorPalette : ""
  );

  const classes = useStyles();

  return (
    <Container
      maxWidth={false}
      className={classes.root}
      style={{
        backgroundColor: colorConfig.backgroundColor,
      }}
      {...rest}
    >
      <div className={classes.innerContainer}>
        {headline && headline?.length > 0 && (
          <Typography
            variant="h1"
            component="h2"
            className={classes.headline}
            style={{ color: colorConfig.headlineColor }}
          >
            {optimizeLineBreak(headline)}
          </Typography>
        )}

        {subline && Object.keys(subline)?.length > 0 && (
          <LayoutContext.Provider
            value={{ ...layoutContextValues, parent: "cta-subline" }}
          >
            <div style={{ color: colorConfig.textColor }}>
              <RichtextCtfComponentFeature
                {...subline}
                className={classes.subline}
              />
            </div>
          </LayoutContext.Provider>
        )}

        {targetPage?.slug &&
          targetPage?.slug?.length > 0 &&
          ctaText &&
          ctaText?.length > 0 && (
            <div className={classes.ctaContainer}>
              <PageLinkFeature
                page={targetPage}
                variant="contained"
                color={colorConfig.buttonColor}
                isButton
                urlParams={urlParameters ?? ""}
              >
                {ctaText}
              </PageLinkFeature>
            </div>
          )}
      </div>
    </Container>
  );
};

CtaCtfComponentFeature.displayName = "CtaCtfComponentFeature";

export default CtaCtfComponentFeature;
