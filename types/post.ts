type Post = {
  slug: string;
  title: string;
  date: string;
  authors: string[];
  topic: string;
  excerpt: string;
  content: string;
  coverImage: string;
  ogImage: {
    url: string;
  };
};

export default Post;
