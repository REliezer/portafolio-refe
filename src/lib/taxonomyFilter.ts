const taxonomyFilter = (posts: any[], name: string, key: string) =>
  posts.filter((post) =>
    Array.isArray(post.data?.[name]) && post.data[name].includes(key)
  );

export default taxonomyFilter;
