import Footer from "@components/Footer";
import { HeaderSolid } from "@components/Header";
import Layout from "@components/layouts/Layout";
import PostBody from "@components/posts/PostBody";
import { getAllPosts } from "lib/api";
import markdownToHtml, { markdownToToc } from "lib/markdownToHtml";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import PostType from "types/post";


type Props = {
    post: PostType;
    previous?: PostType;
    next?: PostType;
    toc: string[];
};

const Post = ({ post, previous, next, toc }: Props) => {
    const router = useRouter();
    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404} />;
    }
    return (
        <Layout title="Blog">
            <HeaderSolid />
            <div className="flex">
                <div className="flex-1" />
                <article className="flex-shrink prose pt-40 pb-10 max-w-2xl">
                    <PostBody post={post} />
                    <MorePosts previous={previous} next={next} />
                    <Footer />
                </article>
                <div className="flex-1" />
            </div>
        </Layout>
    );
};

type MorePostsProps = { previous?: PostType, next?: PostType }
function MorePosts({ previous, next }: MorePostsProps) {
    return (
        <div className='flex w-full py-10 px-10'>
            <div className="flex-grow" />
            <div className="flex-grow" />
        </div>
    )
}


export default Post;

type Params = {
    params: {
        slug: string;
    };
};

export async function getStaticProps({ params }: Params) {
    const posts = getAllPosts();
    const index = posts.findIndex(post => post.slug === params.slug)
    const post = posts[index]
    const content = await markdownToHtml(post.content || "");
    const next = index > 0 && posts[index - 1]
    const previous = index < posts.length && posts[index + 1]
    const toc = await markdownToToc(post.content || "");

    return {
        props: {
            post: {
                ...post,
                content,
            },
            next: next || null,
            previous: previous || null,
            toc,
        },
    };
}

export async function getStaticPaths() {
    const posts = getAllPosts();

    return {
        paths: posts.map((posts) => {
            return {
                params: {
                    slug: posts.slug,
                },
            };
        }),
        fallback: false,
    };
}
