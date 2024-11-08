'use client'

import React from 'react'

import BlogEdit from '@/components/BlogEdit'
import Layout from '@/components/Layout'

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
