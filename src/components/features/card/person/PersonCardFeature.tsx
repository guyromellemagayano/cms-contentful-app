"use client";

import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { AvatarFeature } from "@/components/features/avatar";
import { PersonFieldsFragment } from "@/components/features/ctf-components/person";
import { RichtextCtfComponentFeature } from "@/components/features/ctf-components/richtext";
import { LayoutContext, layoutContextValues } from "@/contexts/layout";
import type { WithAny } from "@/types/common";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  avatar: {
    flexShrink: 0,
    marginRight: theme.spacing(13),
    width: "10rem",
  },
  name: {
    fontSize: "1.8rem",
    lineHeight: 1.333,
    marginBottom: theme.spacing(2),
    marginTop: 0,
  },
  bio: {
    color: "#797979",
    "& p": {
      fontSize: "1.8rem",
      lineHeight: 1.333,
    },
  },
}));

export type PersonCardFeatureProps = WithAny & PersonFieldsFragment;

/**
 * Renders the person card feature component.
 * @param {PersonCardFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const PersonCardFeature = (props: PersonCardFeatureProps) => {
  const { name, bio, avatar, ...rest } = props;

  const classes = useStyles();

  return (
    <div className={classes.root} {...rest}>
      {avatar && Object.keys(avatar)?.length > 0 && (
        <div className={classes.avatar}>
          <AvatarFeature asset={avatar} />
        </div>
      )}

      <div>
        {name && name?.length > 0 && <p className={classes.name}>{name}</p>}

        <LayoutContext.Provider
          value={{ ...layoutContextValues, parent: "card-person" }}
        >
          <div>
            {bio && Object.keys(bio)?.length > 0 && (
              <RichtextCtfComponentFeature className={classes.bio} {...bio} />
            )}
          </div>
        </LayoutContext.Provider>
      </div>
    </div>
  );
};

PersonCardFeature.displayName = "PersonCardFeature";

export default PersonCardFeature;
