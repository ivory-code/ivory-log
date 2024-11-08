import {forwardRef, useImperativeHandle, useState} from 'react'

import BlogEdit from '@/components/BlogEdit'
import Modal from '@/components/Modal'
import {type BlogData} from '@/templates/BlogPage'

interface BlogEditModalProps {
  blogData: BlogData | undefined
  refetchBlogs: () => void
}

export interface BlogEditModalRef {
  openModal: () => void
  closeModal: () => void
}

const BlogEditModal = forwardRef<BlogEditModalRef, BlogEditModalProps>(
  ({blogData, refetchBlogs}, ref) => {
    const [isModalVisible, setIsModalVisible] = useState(false)

    useImperativeHandle(ref, () => ({
      openModal() {
        setIsModalVisible(true)
      },
      closeModal() {
        setIsModalVisible(false)
      },
    }))

    return (
      <Modal
        classWrap="max-w-[48rem] md:min-h-screen-ios md:rounded-none"
        onClose={() => setIsModalVisible(false)}
        isVisible={isModalVisible}>
        <BlogEdit blogData={blogData} refetchBlogs={refetchBlogs} />
      </Modal>
    )
  },
)

BlogEditModal.displayName = 'BlogEditModal'

export default BlogEditModal
