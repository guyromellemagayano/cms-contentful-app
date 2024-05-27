import {
  type AuthorData,
  type CoverImageData,
} from "@/components/layouts/more-stories";

export type HeroPostProps<CID extends CoverImageData, AD extends AuthorData> = {
  title: string;
  coverImage: CID;
  date: string;
  excerpt: string;
  author: AD;
  slug: string;
};
