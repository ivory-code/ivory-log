import {useRouter} from 'next/navigation'
import {useState, useCallback} from 'react'

import {type BlogData} from '@/shared/types'
import {useUser} from '@/store/user'

const FILE_MAX_SIZE = 1048576 // 1MB 제한

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

  // 파일 검증 함수
  const validateFile = useCallback((file: File): boolean => {
    const validations = [
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
  }, [])

  // 이미지 변경 처리
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

  // 이미지 업로드 처리
  const uploadImage = useCallback(
    async (file: File): Promise<string | null> => {
      if (!validateFile(file)) return null

      // API 호출 또는 다른 업로드 로직
      // setDialogConfig({
      //   ...dialogConfig,
      //   isVisible: true,
      //   isError: true,
      //   message: '이미지 업로드에 실패했습니다.',
      // })

      return '/uploaded-image-url' // 업로드된 이미지 URL을 반환
    },
    [validateFile],
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
        // Edit Blog API (예: `updateBlog`)
        // eslint-disable-next-line no-console
        console.log('blogPayload', blogPayload)
        setMessage('성공적으로 수정되었습니다.')
      } else {
        // Add Blog API
        // eslint-disable-next-line no-console
        console.log('userId + blogPayload', `${user?.id} +${blogPayload}`)
        router.push('/blog')
      }
    } catch (error) {
      setDialogConfig({
        ...dialogConfig,
        isVisible: true,
        isError: true,
        message: '게시물을 등록/수정할 수 없습니다.',
      })
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
    handleEdit,
    message,
    dialogConfig,
  }
}
