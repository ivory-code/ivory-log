import {useRouter} from 'next/navigation'
import {useState, useCallback} from 'react'

import {createBlog} from '@/app/api/createBlog'
import {editBlog} from '@/app/api/editBlog'
import {type BlogData} from '@/shared/types'
import {useUser} from '@/store/user'
import {createBrowserClient} from '@/supabase/client'

const FILE_MAX_SIZE = 1048576 // 1MB 제한

const supabase = createBrowserClient()

export const useBlogEdit = (blogData?: BlogData) => {
  const user = useUser(state => state.user)
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: blogData?.title ?? '',
    imageUrl: blogData?.titleImageUrl ?? '',
    content: blogData?.content ?? '',
  })
  const [mainImageFile, setMainImageFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const [dialogConfig, setDialogConfig] = useState({
    isVisible: false,
    isError: false,
    message: '',
  })

  const validateFile = useCallback((file: File): boolean => {
    if (file.size > FILE_MAX_SIZE) {
      setDialogConfig({
        isVisible: true,
        isError: true,
        message: '파일 용량은 1MB 이하만 허용됩니다.',
      })
      return false
    }
    return true
  }, [])

  const uploadImage = useCallback(
    async (file: File): Promise<string | null> => {
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
    },
    [dialogConfig, validateFile],
  )

  // 이미지 파일 변경 처리 (메인 이미지 변경)
  const handleMainImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file = event.target.files[0]
        if (!validateFile(file)) return

        setMainImageFile(file)
        setFormData(prev => ({...prev, imageUrl: URL.createObjectURL(file)}))
      }
    },
    [validateFile],
  )

  // 에디터에서 이미지 드래그 앤 드롭을 통한 추가
  const handleImageDropInEditor = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      if (event.dataTransfer.files && event.dataTransfer.files[0]) {
        const file = event.dataTransfer.files[0]
        if (!validateFile(file)) return

        const imageUrl = await uploadImage(file)
        if (imageUrl) {
          setFormData(prev => ({
            ...prev,
            content: `${prev.content}\n![이미지](${imageUrl})\n`,
          }))
        }
      }
    },
    [uploadImage, validateFile],
  )

  const handleEdit = useCallback(async () => {
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
        setMessage('성공적으로 수정되었습니다.')
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
      setMessage('게시물을 등록/수정할 수 없습니다.')
    }
  }, [
    formData.imageUrl,
    formData.title,
    formData.content,
    mainImageFile,
    blogData,
    uploadImage,
    user?.id,
    router,
    dialogConfig,
  ])

  return {
    formData,
    setFormData,
    setDialogConfig,
    handleMainImageChange,
    handleImageDropInEditor,
    handleEdit,
    message,
    dialogConfig,
    uploadImage,
  }
}
