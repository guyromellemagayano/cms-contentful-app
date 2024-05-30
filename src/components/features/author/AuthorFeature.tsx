import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { AvatarFeature } from "@/components/features/avatar";
import type { PersonFieldsFragment } from "@/components/features/ctf-components/person";
import type { WithAny } from "@/types/common";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    display: "inline-block",
    width: "11.4rem",
  },
  name: {
    fontSize: "2.5rem",
    lineHeight: 1.52,
    marginBottom: 0,
    marginTop: theme.spacing(3),
  },
}));

export type AuthorFeatureProps = WithAny & PersonFieldsFragment;

/**
 * Renders the author feature component.
 * @param {AuthorFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const AuthorFeature = (props: AuthorFeatureProps) => {
  const { name, avatar, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest}>
      {avatar && Object.keys(avatar)?.length > 0 && (
        <div className={classes.avatar}>
          <AvatarFeature asset={avatar} />
        </div>
      )}

      {name && name?.length > 0 && <p className={classes.name}>{name}</p>}
    </div>
  );
};

AuthorFeature.displayName = "AuthorFeature";

export default AuthorFeature;
