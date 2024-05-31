import { ReactNode } from "react";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";

import type { WithAny } from "@/types/common";

export type Asset = WithAny & {
  sys: {
    id: string;
  };
  url: string;
  description: string;
};

export type AssetLink = WithAny & {
  block: Asset[];
};

export type Content = WithAny & {
  json: any;
  links: {
    assets: AssetLink;
  };
};

export type RichTextAssetProps = WithAny & {
  id: string;
  assets: Asset[] | undefined;
};

/**
 * Renders a rich text asset based on the provided ID and assets.
 * @param {RichTextAssetProps} props - The properties to render the rich text asset with.
 * @returns The rendered rich text asset as an Image component, or null if the asset is not found or does not have a URL.
 */
export const RichTextAsset = ({ id, assets }: RichTextAssetProps) => {
  const asset = assets?.find((asset) => asset.sys.id === id);

  if (asset?.url) {
    return <Image src={asset.url} layout="fill" alt={asset.description} />;
  }

  return null;
};

export type MarkdownProps = WithAny & {
  content: Content;
};

/**
 * Renders Markdown content as React components.
 * @param {MarkdownProps} props - The properties to render the Markdown content with.
 * @returns The rendered React components.
 */
const Markdown = (props: MarkdownProps): ReactNode => {
  const { content } = props;

  return documentToReactComponents(content.json, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
        <RichTextAsset
          id={node.data.target.sys.id}
          assets={content.links.assets.block}
        />
      ),
    },
  });
};

Markdown.displayName = "Markdown";

export default Markdown;
