import tinytime from 'tinytime';
import Layout from '@components/layouts/Layout';
import Footer from '@components/Footer';
import { HeaderSolid } from '@components/Header';
import Link from 'next/link'

const posts = getAllPostPreviews()
const postDateTemplate = tinytime('{MMMM} {DD}, {YYYY}')

const Blog = () => <Layout title="Blog">
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
    <ul className="divide-y divide-gray-200">
      {posts.map(({ link, module: { default: Component, meta } }) => {
        return (
          <li key={link} className="py-12">
            <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
              <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base leading-6 font-medium text-gray-500">
                  <time dateTime={meta.date}>{postDateTemplate.render(new Date(meta.date))}</time>
                </dd>
              </dl>
              <div className="space-y-5 xl:col-span-3">
                <div className="space-y-6">
                  <h2 className="text-2xl leading-8 font-bold tracking-tight">
                    <Link href={link}>
                      <a className="text-gray-900">{meta.title}</a>
                    </Link>
                  </h2>
                  <div className="prose max-w-none text-gray-500">
                    <Component />
                  </div>
                </div>
                <div className="text-base leading-6 font-medium">
                  <Link href={link}>
                    <a
                      className="text-teal-500 hover:text-teal-600"
                      aria-label={`Read "${meta.title}"`}
                    >
                      Read more &rarr;
                      </a>
                  </Link>
                </div>
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  </div>
  <Footer />
</Layout>

function importAll(r) {
  return r
    .keys()
    .filter((filename) => !filename.startsWith('pages'))
    .map((fileName) => ({
      link: "blog/" + fileName.replace(/\/preview\.mdx$/, ''),
      module: r(fileName),
    }))
}

function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

function getAllPostPreviews() {
  return importAll(require.context('./', true, /preview\.mdx$/)).sort((a, b) =>
    dateSortDesc(a.module.meta.date, b.module.meta.date)
  )
}

export default Blog