import { ReactNode } from "react";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";

export type Asset = {
  sys: {
    id: string;
  };
  url: string;
  description: string;
};

export type AssetLink = {
  block: Asset[];
};

export type Content = {
  json: any;
  links: {
    assets: AssetLink;
  };
};

export type RichTextAssetProps = {
  id: string;
  assets: Asset[] | undefined;
};

/**
 * Renders a rich text asset based on the provided ID and assets.
 * @param id - The ID of the asset to render.
 * @param assets - The array of assets to search for the specified ID.
 * @returns The rendered rich text asset as an Image component, or null if the asset is not found or does not have a URL.
 */
export const RichTextAsset = ({ id, assets }: RichTextAssetProps) => {
  const asset = assets?.find((asset) => asset.sys.id === id);

  if (asset?.url) {
    return <Image src={asset.url} layout="fill" alt={asset.description} />;
  }

  return null;
};

export type MarkdownProps = {
  content: Content;
};

/**
 * Renders Markdown content as React components.
 * @param content - The Markdown content.
 * @returns The rendered React components.
 */
const Markdown = ({ content }: MarkdownProps): ReactNode =>
  documentToReactComponents(content.json, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
        <RichTextAsset
          id={node.data.target.sys.id}
          assets={content.links.assets.block}
        />
      ),
    },
  });

Markdown.displayName = "Markdown";

export default Markdown;
