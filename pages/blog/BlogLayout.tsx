import Footer from '@components/Footer'
import { HeaderSolid } from '@components/Header'
import Layout from '@components/layouts/Layout'
import React from 'react'

interface BlogLayoutProps { children: any }
function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <Layout title="Blog">
      <HeaderSolid />
      <div className="flex">
        <div className="flex-1" />
        <article className="flex-shrink prose pt-40 pb-10 max-w-2xl">
          {children}
        </article>
        <div className="flex-1" />
      </div>
      <Footer />
    </Layout>)
}

export default BlogLayout