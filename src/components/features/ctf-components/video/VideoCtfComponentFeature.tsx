import { makeStyles } from "@mui/styles";

import type { AssetFieldsFragment } from "@/components/features/ctf-components/asset";
import type { WithClassName } from "@/types/common";

const useStyles = makeStyles(() => ({
  image: {
    width: "100%",
  },

  video: {
    width: "100%",
  },

  caption: {
    color: "#797979",
    fontSize: "1.8rem",
    fontStyle: "italic",
    lineHeight: 1.389,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "4.7rem",
    maxWidth: "77rem",
    textAlign: "center",
  },
}));

export type VideoCtfComponentFeatureProps = WithClassName &
  AssetFieldsFragment & {
    showDescription?: boolean;
    autoplay?: boolean;
  };

/**
 * Renders the video `contentful` component feature.
 * @param {VideoCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `contentful` component feature.
 */
const VideoCtfComponentFeature = (props: VideoCtfComponentFeatureProps) => {
  const { description, url, showDescription, autoplay, className } = props;

  const classes = useStyles();

  return (
    <div className={className}>
      <video
        src={url!}
        autoPlay={autoplay}
        controls
        className={classes.video}
      />

      {showDescription && description && description?.length > 0 && (
        <p className={classes.caption}>{description}</p>
      )}
    </div>
  );
};

VideoCtfComponentFeature.displayName = "VideoCtfComponentFeature";

export default VideoCtfComponentFeature;
