const POST_GRAPHQL_FIELDS = `
  slug
  title
  coverImage {
    url
  }
  date
  author {
    name
    picture {
      url
    }
  }
  excerpt
  content {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`;

const PAGE_GRAPHQL_FIELDS = `
  internalName
  pageName
  slug
`;

export const fetchGraphQL = async (
  query: string,
  preview = false
): Promise<any> =>
  fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["posts"] },
    }
  ).then((response) => response.json());

export const extractPost = (fetchResponse: any): any =>
  fetchResponse?.data?.postCollection?.items?.[0];

export const extractPostEntries = (fetchResponse: any): any[] =>
  fetchResponse?.data?.postCollection?.items;

export const getPreviewPostBySlug = async (
  slug: string | null
): Promise<any> => {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );

  return extractPost(entry);
};

export const getAllPosts = async (isDraftMode: boolean): Promise<any[]> => {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );

  return extractPostEntries(entries);
};

export const getPostAndMorePosts = async (
  slug: string,
  preview: boolean
): Promise<any> => {
  const entry = await fetchGraphQL(
      `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
        preview ? "true" : "false"
      }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
      preview
    ),
    entries = await fetchGraphQL(
      `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
        preview ? "true" : "false"
      }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
      preview
    );

  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  };
};

export const extractPage = (fetchResponse: any): any =>
  fetchResponse?.data?.pageCollection?.items?.[0];

export const extractPageEntries = (fetchResponse: any): any[] =>
  fetchResponse?.data?.pageCollection?.items;

export const getAllPages = async (isDraftMode: boolean): Promise<any[]> => {
  const entries = await fetchGraphQL(
    `query {
      pageCollection(where: { slug_exists: true }, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${PAGE_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );

  console.log(JSON.stringify(entries));

  return extractPageEntries(entries);
};
