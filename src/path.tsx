export const paths = {
  getHomePath: () => "/",
  getTopicShowPath: (slug: string) => `/topics/${slug}`,
  getPostCreatePath: (slug: string) => `/topics/${slug}/posts/new`,
  getPostShowPath: (slug: string, postId: string) =>
    `/topics/${slug}/posts/${postId}`,
};
