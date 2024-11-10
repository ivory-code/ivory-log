'use client'

import MDEditor from '@uiw/react-md-editor'
import {forwardRef} from 'react'

import ImageUploader from '@/features/blog/components/ImageUploader'
import InputField from '@/features/blog/components/InputField'
import {useBlogEdit} from '@/features/blog/hooks/useBlogEdit'
import Button from '@/shared/components/Button'
import Dialog from '@/shared/components/Dialog'
import Typography from '@/shared/components/Typography'
import {type BlogData} from '@/shared/types'

// BlogEdit 컴포넌트에서 ref를 사용할 경우
const BlogEdit = forwardRef<
  HTMLDivElement,
  {blogData?: BlogData; refetchBlogs?: () => void}
>(({blogData, refetchBlogs}, ref) => {
  const {
    formData,
    setFormData,
    handleMainImageChange,
    handleEdit,
    message,
    dialogConfig,
    setDialogConfig,
  } = useBlogEdit(blogData)

  const handleConfirm = async () => {
    handleEdit()
    refetchBlogs?.()
  }

  return (
    <div ref={ref} className="flex flex-col h-full p-4 overflow-auto">
      <div className="flex justify-end items-center h-18">
        <Button onClick={handleEdit} className="border border-gray-300">
          <Typography
            text={blogData ? '게시글 수정' : '게시글 등록'}
            className="base2"
          />
        </Button>
      </div>

      {message && (
        <div
          className={`p-4 mb-4 ${dialogConfig.isError ? 'text-red-800 bg-red-200' : 'text-green-800 bg-green-200'}`}>
          <Typography text={message} className="base2" />
        </div>
      )}

      <InputField
        label="제목"
        name="title"
        value={formData.title}
        placeholder="제목을 입력해주세요."
        onChange={e => setFormData({...formData, title: e.target.value})}
      />

      <ImageUploader
        label="메인 이미지 수정"
        onImageChange={handleMainImageChange}
        imageUrl={formData.imageUrl}
      />

      <div className="flex flex-col mb-4">
        <h2 className="text-xl font-bold mb-2">내용</h2>
        <MDEditor
          value={formData.content}
          onChange={value => setFormData({...formData, content: value || ''})}
          style={{minHeight: '500px'}}
          preview="live"
        />
      </div>

      <Dialog
        isVisible={dialogConfig.isVisible}
        isError={dialogConfig.isError}
        message={dialogConfig.message}
        onConfirm={handleConfirm}
        onCancel={() => setDialogConfig({...dialogConfig, isVisible: false})}
      />
    </div>
  )
})

BlogEdit.displayName = 'BlogEdit'

export default BlogEdit
