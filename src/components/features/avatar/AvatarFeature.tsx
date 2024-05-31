"use client";

import { useMemo } from "react";

import { Avatar as MuiAvatar } from "@mui/material";
import { makeStyles } from "@mui/styles";

import type { AssetFieldsFragment } from "@/components/features/ctf-components/asset";
import type { WithAny } from "@/types/common";

const useStyles = makeStyles(() => ({
  avatarRoot: {
    width: `100%`,
    height: 0,
    padding: `50%`,
    position: `relative`,
  },
  avatar: {
    width: "100%",
    height: "100%",
    position: `absolute`,
    top: 0,
    left: 0,
  },
}));

export type AvatarFeatureProps = WithAny & {
  asset: AssetFieldsFragment;
  widthPx?: number;
};

/**
 * Renders the avatar feature component.
 * @param {AvatarFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const AvatarFeature = (props: AvatarFeatureProps) => {
  const { asset, widthPx = 250, ...rest } = props;

  const classes = useStyles();
  const url = useMemo(() => `${asset.url}?wwidthPx}`, [asset.url]);

  return url && url?.length > 0 ? (
    <div className={classes.avatarRoot} {...rest}>
      <MuiAvatar className={classes.avatar} src={url} />
    </div>
  ) : null;
};

AvatarFeature.displayName = "AvatarFeature";

export default AvatarFeature;
