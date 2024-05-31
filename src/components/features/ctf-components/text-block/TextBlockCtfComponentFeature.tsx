import type { WithAny } from "@/types/common";
import { Container, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { RichtextCtfComponentFeature } from "@/components/features/ctf-components/richtext";
import { SectionHeadlinesFeature } from "@/components/features/section-headlines";
import { getColorConfigFromPalette } from "@/theme";

import { TextBlockFieldsFragment } from "./__generated/text-block-ctf-component-feature.generated";

const useStyles = makeStyles((theme: Theme) => ({
  innerContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "126rem",
    padding: theme.spacing(19, 0, 19),
  },
  sectionHeadlines: {
    marginBottom: theme.spacing(12),
  },
}));

export type TextBlockCtfComponentFeatureProps = WithAny &
  TextBlockFieldsFragment;

/**
 * Renders the text block `contentful` feature component.
 * @param {TextBlockCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `contentful` feature component.
 */
const TextBlockCtfComponentFeature = (
  props: TextBlockCtfComponentFeatureProps
) => {
  const { headline, subline, body, colorPalette, ...rest } = props;

  const colorConfig = getColorConfigFromPalette(
    colorPalette && colorPalette?.length > 0 ? colorPalette : ""
  );

  const classes = useStyles();

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: colorConfig.backgroundColor,
      }}
      {...rest}
    >
      <div className={classes.innerContainer}>
        {(headline && headline?.length > 0) ||
          (subline && subline?.length > 0 && (
            <SectionHeadlinesFeature
              headline={headline}
              headlineProps={{
                style: { color: colorConfig.headlineColor },
              }}
              subline={subline}
              sublineProps={{
                style: { color: colorConfig.textColor },
              }}
              className={classes.sectionHeadlines}
            />
          ))}

        {body && Object.keys(body)?.length > 0 && (
          <div
            style={{
              color: colorConfig.textColor,
            }}
          >
            <RichtextCtfComponentFeature {...body} />
          </div>
        )}
      </div>
    </Container>
  );
};

TextBlockCtfComponentFeature.displayName = "TextBlockCtfComponentFeature";

export default TextBlockCtfComponentFeature;
