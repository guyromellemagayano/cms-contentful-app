export type MoreStoriesProps<
  CID extends CoverImageData,
  AD extends AuthorData<PictureAuthorData>
> = {
  title: string;
  coverImage: CID;
  date: string;
  excerpt: string;
  author: AD;
  slug: string;
};

export type CoverImageData = {
  url: string;
  [key: string]: any;
};

export type AuthorData<PAD extends PictureAuthorData> = {
  name: string;
  picture: PAD;
  [key: string]: any;
};

export type PictureAuthorData = {
  url: string;
  [key: string]: any;
};
