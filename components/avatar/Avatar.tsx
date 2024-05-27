import ContentfulImage from "@/lib/contentful-image";

import { type AvatarProps } from "./types";

/**
 * Avatar component displays an avatar with a name.
 *
 * @param name - The name of the avatar.
 * @param picture - The picture object of the avatar.
 *
 * @returns The rendered Avatar component.
 */
const Avatar = ({ name, picture }: AvatarProps): JSX.Element => {
  return (
    <div className="flex items-center">
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
