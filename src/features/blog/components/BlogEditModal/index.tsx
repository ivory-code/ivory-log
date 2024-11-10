import {forwardRef, useImperativeHandle, useState} from 'react'

import BlogEdit from '@/features/blog/components/BlogEdit'
import Modal from '@/shared/components/Modal'
import {type BlogData} from '@/shared/types'

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
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}>
        <BlogEdit blogData={blogData} refetchBlogs={refetchBlogs} />
      </Modal>
    )
  },
)

BlogEditModal.displayName = 'BlogEditModal'

export default BlogEditModal
