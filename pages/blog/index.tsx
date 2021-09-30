import Layout from "@components/layouts/Layout";
import Post from "types/post";
import PostsList from "@components/posts/PostsList";
import { getAllPosts } from "lib/api";
import { HeaderSolid } from "@components/Header";

interface Props {
  posts: Post[];
}

const Index = ({ posts }: Props) => (
  <Layout title="Blog">
    <HeaderSolid />
    <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 divide-y divide-gray-200">
      <div className="pt-40 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-xl leading-9 font-semibold text-gray-900 tracking-tight sm:text-2xl sm:leading-10 md:text-3xl md:leading-14">
          Blog Posts
        </h1>
        <p className="text-lg leading-7 text-gray-500">
          Stay in contact with all the latest news about Kubernetic.
        </p>
      </div>
      <PostsList posts={posts} />
    </div>
  </Layout>
);

export const getStaticProps = async () => {
  const posts = getAllPosts();
  return { props: { posts } };
};

export default Index;
