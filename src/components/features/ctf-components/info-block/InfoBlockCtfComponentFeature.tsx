import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import { Container, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

import { AssetCtfComponentFeature } from "@/components/features/ctf-components/asset";
import { RichtextCtfComponentFeature } from "@/components/features/ctf-components/richtext";
import { SectionHeadlinesFeature } from "@/components/features/section-headlines";
import { LayoutContext, layoutContextValues } from "@/contexts/layout";
import { getColorConfigFromPalette } from "@/theme";
import type { WithAny } from "@/types/common";

import type { InfoBlockFieldsFragment } from "./__generated/info-block-ctf-component-feature.generated";

const useStyles = makeStyles((theme: Theme) => ({
  innerContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "126rem",
    padding: theme.spacing(19, 0, 19),
  },
  innerContainerAfterInfoBlock: {
    marginTop: theme.spacing(-19),
    paddingTop: 0,
  },
  sectionHeadlines: {
    marginBottom: theme.spacing(12),
  },
  blocksGrid: {
    alignItems: "flex-start",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginLeft: "-5rem",
    marginTop: "-5rem",
  },
  block: {
    marginLeft: "5rem",
    marginTop: "5rem",
    maxWidth: "39rem",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "calc((100% - 15rem) / 3)",
      "@supports not (width: calc((100% - 15rem) / 3))": {
        width: "29%",
      },
    },
  },
  itemIcon: {
    alignItems: "center",
    display: "flex",
    fontSize: 0,
    height: "11.3rem",
    justifyContent: "center",
    width: "11.3rem",
  },
  itemText: {
    "& .MuiContainer-root:last-child .MuiTypography-body1": {
      marginBottom: 0,
    },
    "& .MuiContainer-root:first-child": {
      marginTop: "3rem",
    },
    "& h3": {
      fontSize: "1.8rem",
      marginBottom: "2rem",
      marginTop: "3rem",
    },
    "& p": {
      color: "#6f6f6f",
      fontSize: "1.8rem",
      lineHeight: 1.52,
    },
  },
}));

export type InfoBlockCtfComponentFeatureProps = WithAny &
  InfoBlockFieldsFragment & {
    previousComponent?: string | null;
  };

/**
 * Renders an info block `contentful` feature component.
 * @param {InfoBlockCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `contentful` feature component.
 */
const InfoBlockCtfComponentFeature = (
  props: InfoBlockCtfComponentFeatureProps
) => {
  const {
    headline,
    subline,
    block1Image,
    block1Body,
    block2Image,
    block2Body,
    block3Image,
    block3Body,
    previousComponent,
    colorPalette,
    sys: { id },
    ...rest
  } = props;

  const colorConfig = getColorConfigFromPalette(
    colorPalette && colorPalette?.length > 0 ? colorPalette : ""
  );

  const classes = useStyles();
  const inspectorMode = useContentfulInspectorMode({ entryId: id });

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: colorConfig.backgroundColor,
      }}
      {...rest}
    >
      <div
        className={clsx(
          classes.innerContainer,
          previousComponent === "ComponentInfoBlock" && !headline && !subline
            ? classes.innerContainerAfterInfoBlock
            : null
        )}
      >
        {headline && headline?.length > 0 && subline && subline?.length > 0 && (
          <SectionHeadlinesFeature
            headline={headline}
            headlineProps={{
              style: { color: colorConfig.headlineColor },
              ...inspectorMode({
                fieldId: "headline",
              }),
            }}
            subline={subline}
            sublineProps={{
              style: { color: colorConfig.textColor },
              ...inspectorMode({
                fieldId: "subline",
              }),
            }}
            className={classes.sectionHeadlines}
          />
        )}

        <LayoutContext.Provider
          value={{ ...layoutContextValues, parent: "info-block" }}
        >
          <div className={classes.blocksGrid}>
            {block1Body && Object.keys(block1Body)?.length > 0 && (
              <div className={classes.block}>
                {block1Image && Object.keys(block1Image)?.length > 0 && (
                  <div
                    className={classes.itemIcon}
                    {...inspectorMode({
                      fieldId: "block1Image",
                    })}
                  >
                    <AssetCtfComponentFeature
                      showDescription={false}
                      {...block1Image}
                    />
                  </div>
                )}

                <div
                  style={{ color: colorConfig.textColor }}
                  {...inspectorMode({
                    fieldId: "block1Body",
                  })}
                >
                  <RichtextCtfComponentFeature
                    className={classes.itemText}
                    {...block1Body}
                  />
                </div>
              </div>
            )}

            {block2Body && Object.keys(block2Body)?.length > 0 && (
              <div className={classes.block}>
                {block2Image && Object.keys(block2Image)?.length > 0 && (
                  <div
                    className={classes.itemIcon}
                    {...inspectorMode({
                      fieldId: "block2Image",
                    })}
                  >
                    <AssetCtfComponentFeature
                      showDescription={false}
                      {...block2Image}
                    />
                  </div>
                )}

                <div
                  style={{ color: colorConfig.textColor }}
                  {...inspectorMode({
                    fieldId: "block2Body",
                  })}
                >
                  <RichtextCtfComponentFeature
                    className={classes.itemText}
                    {...block2Body}
                  />
                </div>
              </div>
            )}

            {block3Body && Object.keys(block3Body)?.length > 0 && (
              <div className={classes.block}>
                {block3Image && Object.keys(block3Image)?.length > 0 && (
                  <div
                    className={classes.itemIcon}
                    {...inspectorMode({
                      fieldId: "block3Image",
                    })}
                  >
                    <AssetCtfComponentFeature
                      showDescription={false}
                      {...block3Image}
                    />
                  </div>
                )}

                <div
                  style={{ color: colorConfig.textColor }}
                  {...inspectorMode({
                    fieldId: "block3Body",
                  })}
                >
                  <RichtextCtfComponentFeature
                    className={classes.itemText}
                    {...block3Body}
                  />
                </div>
              </div>
            )}
          </div>
        </LayoutContext.Provider>
      </div>
    </Container>
  );
};

InfoBlockCtfComponentFeature.displayName = "InfoBlockCtfComponentFeature";

export default InfoBlockCtfComponentFeature;
