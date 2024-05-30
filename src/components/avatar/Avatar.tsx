import ContentfulImage from "@/components/images/contentful/ContentfulImage";
import { PictureAuthorData } from "@/components/layouts/more-stories";
import type { WithAny } from "@/types/common";

export type AvatarProps = WithAny & {
  name: string;
  picture: PictureAuthorData;
};

/**
 * Renders an avatar component.
 * @param {AvatarProps} props - The properties to render the component with.
 * @returns The rendered component
 */
const Avatar = (props: AvatarProps) => {
  const { name, picture, ...rest } = props;

  return (
    <div className="flex items-center" {...rest}>
      <div className="mr-4 w-12 h-12">
        <ContentfulImage
          alt={name}
          className="object-cover h-full rounded-full"
          height={48}
          width={48}
          src={picture.url || "#"}
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
};

Avatar.displayName = "Avatar";

export default Avatar;
