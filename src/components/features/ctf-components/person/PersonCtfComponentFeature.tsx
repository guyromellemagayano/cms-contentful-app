"use client";

import { Container, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { AuthorFeature } from "@/components/features/author";
import { LeadershipCardFeature } from "@/components/features/card/leadership";
import { PersonCardFeature } from "@/components/features/card/person";
import { useLayoutContext } from "@/hooks/layout";
import type { WithAny } from "@/types/common";

import { PersonFieldsFragment } from "./__generated/person-ctf-component-feature.generated";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export type PersonCtfComponentFeatureProps = WithAny &
  PersonFieldsFragment & {
    previousComponent: string | null;
  };

/**
 * Renders the person `contentful` feature component.
 * @param {PersonCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `contentful` feature component.
 */
const PersonCtfComponentFeature = (props: PersonCtfComponentFeatureProps) => {
  const { cardStyle } = props;

  const isLeadership = !cardStyle;

  const layout = useLayoutContext();
  const classes = useStyles();

  return layout.parent === "quote" ? (
    <div className={classes.root} style={{ maxWidth: layout.containerWidth }}>
      <AuthorFeature {...props} />
    </div>
  ) : (
    <Container maxWidth={false}>
      <div className={classes.root} style={{ maxWidth: layout.containerWidth }}>
        {isLeadership ? (
          <LeadershipCardFeature {...props} />
        ) : (
          <PersonCardFeature {...props} />
        )}
      </div>
    </Container>
  );
};

PersonCtfComponentFeature.displayName = "PersonCtfComponentFeature";

export default PersonCtfComponentFeature;
