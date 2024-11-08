'use client'

import MDEditor from '@uiw/react-md-editor'
import {useRouter} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'

import {createBlog} from '@/app/api/createBlog'
import {editBlog} from '@/app/api/editBlog'
import Button from '@/components/Button'
import Dialog from '@/components/Dialog'
import ImageUpload from '@/components/ImageUpload'
import InputField from '@/components/InputField'
import Typography from '@/components/Typography'
import {useUser} from '@/store/user'
import {createBrowserClient} from '@/supabase/client'
import {type BlogData} from '@/templates/BlogPage'

import type {ChangeEvent} from 'react'

const FILE_MAX_SIZE = 1048576

const supabase = createBrowserClient()

const BlogEdit = ({
  blogData,
  refetchBlogs,
}: {
  blogData?: BlogData
  refetchBlogs?: () => void
}) => {
  const router = useRouter()
  const user = useUser(state => state.user)

  const [mainImageFile, setMainImageFile] = useState<File | null>(null)
  const [message, setMessage] = useState('') // 성공 메시지 상태 추가
  const [formData, setFormData] = useState({
    title: blogData?.title ?? '',
    imageUrl: blogData?.titleImageUrl ?? '',
    content: blogData?.content ?? '',
  })
  const [dialogConfig, setDialogConfig] = useState({
    isVisible: false,
    isError: false,
    message: '',
  })

  const validateFile = (file: File): boolean => {
    const validations = [
      {
        condition: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(file.name),
        message: '영문 파일명만 허용됩니다.',
      },
      {
        condition: file.size > FILE_MAX_SIZE,
        message: '파일 용량은 1MB 이하만 허용됩니다.',
      },
    ]

    const invalidValidation = validations.find(({condition}) => condition)
    if (invalidValidation) {
      setDialogConfig({
        isVisible: true,
        isError: true,
        message: invalidValidation.message,
      })
      return false
    }

    return true
  }

  const handleMainImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      if (!validateFile(file)) return

      setMainImageFile(file)
      setFormData(prev => ({...prev, imageUrl: URL.createObjectURL(file)}))
    }
  }

  const uploadImage = async (file: File) => {
    if (!validateFile(file)) return null

    const {error} = await supabase.storage
      .from('images')
      .upload(file.name, file, {cacheControl: '0', upsert: true})

    if (error) {
      setDialogConfig({
        ...dialogConfig,
        isVisible: true,
        isError: true,
        message: '이미지 업로드에 실패했습니다.',
      })
      return null
    }

    const {data: publicUrlData} = supabase.storage
      .from('images')
      .getPublicUrl(file.name)
    return publicUrlData.publicUrl || ''
  }

  const handleEdit = async () => {
    try {
      let updatedImageUrl = formData.imageUrl

      if (mainImageFile) {
        const imageUrl = await uploadImage(mainImageFile)
        if (imageUrl) updatedImageUrl = imageUrl
      }

      const blogPayload = {
        title: formData.title,
        content: formData.content,
        imageUrl: updatedImageUrl,
      }

      if (blogData) {
        await editBlog({id: blogData.id, ...blogPayload})
        refetchBlogs?.()
        setMessage('성공적으로 수정되었습니다.') // 성공 메시지 설정
      } else {
        await createBlog({id: user?.id ?? '', ...blogPayload})
        router.push('/blog')
      }
    } catch (error) {
      setDialogConfig({
        ...dialogConfig,
        isVisible: true,
        isError: true,
        message: '게시물을 등록/수정할 수 없습니다.',
      })
      setMessage('게시물을 등록/수정할 수 없습니다.') // 성공 메시지 설정
    } finally {
      setDialogConfig(prev => ({...prev, isVisible: false}))
    }
  }

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault()
    const files = event.dataTransfer.files

    if (files.length > 0) {
      const file = files[0]
      if (!validateFile(file)) return

      const imageUrl = await uploadImage(file)
      if (imageUrl) {
        const markdownImageSyntax = `![이미지 설명](${imageUrl})`
        setFormData(prev => ({
          ...prev,
          content: prev.content + `\n${markdownImageSyntax}\n`,
        }))
      }
    }
  }

  const handleConfirmDialog = () => {
    if (dialogConfig.isError) {
      setDialogConfig(prev => ({...prev, isVisible: false}))
    } else {
      handleEdit()
    }
  }

  const handleEditButton = useCallback(() => {
    if (!formData.title || !formData.content) {
      setDialogConfig({
        ...dialogConfig,
        isVisible: true,
        isError: true,
        message: '제목/내용을 입력해주세요.',
      })
      return
    }
    setDialogConfig({
      ...dialogConfig,
      isVisible: true,
      isError: false,
      message: '저장하시겠습니까?',
    })
  }, [dialogConfig, formData.content, formData.title])

  useEffect(() => {
    if (blogData) {
      setFormData({
        title: blogData.title,
        imageUrl: blogData.titleImageUrl,
        content: blogData.content,
      })
    }
  }, [blogData])

  return (
    <div className="flex flex-col h-full p-4 overflow-auto">
      <div className="flex justify-end items-center h-18">
        <Button onClick={handleEditButton} className="border border-gray-300">
          <Typography
            text={blogData ? '게시글 수정' : '게시글 등록'}
            className="base2"
          />
        </Button>
      </div>

      {message && (
        <div
          className={`p-4 mb-4 ${dialogConfig.isError ? 'text-red-800 bg-red-200 rounded-lg' : 'text-green-800 bg-green-200 rounded-lg'}`}>
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

      <ImageUpload
        label="메인 이미지 수정"
        onImageChange={handleMainImageChange}
        imageUrl={formData.imageUrl}
      />

      <div className="flex flex-col mb-4">
        <h2 className="text-xl font-bold mb-2">내용</h2>
        <div onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
          <MDEditor
            value={formData.content}
            onChange={value => setFormData({...formData, content: value || ''})}
            style={{minHeight: '500px'}}
            height={500}
            preview="live"
            visibleDragbar
          />
        </div>
      </div>
      <Dialog
        isError={dialogConfig.isError}
        isVisible={dialogConfig.isVisible}
        message={dialogConfig.message}
        onConfirm={handleConfirmDialog}
        onCancel={() =>
          setDialogConfig(prev => ({
            ...prev,
            isVisible: false,
            isError: false,
          }))
        }
      />
    </div>
  )
}

export default BlogEdit
