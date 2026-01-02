/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import Post from '../../types/post';
import tinytime from 'tinytime';

const postDateTemplate = tinytime('{MMMM} {DD}, {YYYY}')
interface Props { posts: Post[] }
function PostsList({ posts }: Props) {
  return (
    <div className="pt-4">
      <div className="flex flex-col space-y-4">{posts.map(post => <PostRow key={post.slug} post={post} />)}</div>
    </div>
  )
}

interface PostRowProps { post: Post }
function PostRow({ post }: PostRowProps) {

  return (
    <div key={post.slug} className="py-12">
      <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base leading-6 font-medium text-gray-500">
              <time dateTime={post.date}>{postDateTemplate.render(new Date(post.date))}</time>
            </dd>
          </dl>
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <h2 className="text-2xl leading-8 font-bold tracking-tight">
                <Link href={`/blog/${post.slug}`} className="text-gray-900">
                  {post.title}
                </Link>
              </h2>
              {post.coverImage && <img src={post.coverImage} alt={post.title} />}
              <div className="prose max-w-none text-gray-500">
                {post.excerpt}
              </div>
            </div>
            <div className="text-base leading-6 font-medium">
              <Link
                href={`/blog/${post.slug}`}
                className="text-teal-500 hover:text-teal-600"
                aria-label={`Read "${post.title}"`}
              >
                Read more &rarr;
              </Link>
            </div>
          </div>
        </article>
      </div>
  )
}

export default PostsList
