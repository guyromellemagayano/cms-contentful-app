import { Container, Grid, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslations } from "next-intl";
import { File } from "react-kawaii";

import { PageContainerTemplate } from "@/components/templates/page-container";
import { colorfulTheme } from "@/theme";
import type { WithAny } from "@/types/common";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    minhHeight: "100%",
    color: "black",
  },
  container: {
    paddingTop: theme.spacing(16),
  },
  content: {
    "& > *": {
      marginBottom: theme.spacing(6),
    },
  },
  icon: {
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(3),
  },
  headlineWrap: {
    alignItems: "center",
    display: "flex",
  },
}));

export type PageErrorFeatureProps = WithAny & {
  error?: ErrorData;
};

export type ErrorData = WithAny & {
  code: number;
  message?: string;
};

/**
 * Renders the page error feature component.
 * @param {PageErrorFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const PageErrorFeature = (props: PageErrorFeatureProps) => {
  const { error, ...rest } = props;

  const t = useTranslations();
  const classes = useStyles();

  const customError = !error
    ? {
        code: 400,
        message: t("error.somethingWentWrong"),
      }
    : error;

  return (
    <div className={classes.root} {...rest}>
      <PageContainerTemplate>
        <Container className={classes.container}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={8}>
              <div className={classes.headlineWrap}>
                <span className={classes.icon}>
                  <File
                    size={100}
                    mood="ko"
                    color={colorfulTheme.palette.primary.main}
                  />
                </span>
                <Typography variant="h1" gutterBottom>
                  {t("error.code", { code: customError.code })}
                </Typography>
              </div>

              {customError?.message && customError?.message?.length > 0 && (
                <div className={classes.content}>
                  <Typography variant="h4">{customError.message}</Typography>
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      </PageContainerTemplate>
    </div>
  );
};

PageErrorFeature.displayName = "PageErrorFeature";

export default PageErrorFeature;
