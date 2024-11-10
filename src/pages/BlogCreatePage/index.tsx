'use client'

import React from 'react'

import BlogEdit from '@/features/blog/components/BlogEdit'
import Layout from '@/widgets/Layout/components'

export const runtime = 'edge'

const BlogCreatePage = () => {
  return (
    <div>
      <Layout isMainView>
        <BlogEdit />
      </Layout>
    </div>
  )
}

export default BlogCreatePage
