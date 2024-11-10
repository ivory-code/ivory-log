import {useCallback, useState, useEffect} from 'react'

import {createProfile} from '@/app/api/createProfile'
import {editProfile} from '@/app/api/editProfile'
import {SKILLS, TOOLS} from '@/shared/constants'
import {type ProfileData} from '@/shared/types'
import {useUser} from '@/store/user'

const FILE_MAX_SIZE = 1048576

interface DialogConfig {
  isVisible: boolean
  isError: boolean
  message: string
}

export const useProfileEdit = (profileData?: ProfileData) => {
  const user = useUser(state => state.user)

  const [profileForm, setProfileForm] = useState({
    mainTitle: '',
    subTitle: '',
    content: '',
    imageUrl: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
    isVisible: false,
    isError: false,
    message: '',
  })

  const openDialog = (message: string, isError: boolean = false) => {
    setDialogConfig({isVisible: true, isError, message})
  }

  const validateFile = useCallback((file: File): boolean => {
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

    const failedValidation = validations.find(({condition}) => condition)
    if (failedValidation) {
      openDialog(failedValidation.message, true)
      return false
    }

    return true
  }, [])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      if (!validateFile(file)) return

      setImageFile(file)
      setProfileForm(prevForm => ({
        ...prevForm,
        imageUrl: URL.createObjectURL(file),
      }))
    }
  }

  const handleFormChange = (field: keyof typeof profileForm, value: string) => {
    setProfileForm(prevForm => ({
      ...prevForm,
      [field]: value,
    }))
  }

  const uploadImage = useCallback(
    async (file: File) => {
      if (!validateFile(file)) return null
      openDialog('이미지 업로드에 실패했습니다.', true)
      return null
    },
    [validateFile],
  )

  const saveProfile = useCallback(async () => {
    try {
      const uploadedImageUrl = imageFile
        ? await uploadImage(imageFile)
        : profileForm.imageUrl
      if (!uploadedImageUrl) return

      const profilePayload = {
        role: user?.role ?? '',
        contents: profileForm.content,
        mainTitle: profileForm.mainTitle,
        subTitle: profileForm.subTitle,
        skills: SKILLS,
        tools: TOOLS,
        imageUrl: uploadedImageUrl,
      }

      const updatedProfile = profileData
        ? await editProfile({...profilePayload})
        : await createProfile({...profilePayload})

      if (updatedProfile) {
        setDialogConfig({isVisible: false, isError: false, message: ''})
      }
    } catch (error) {
      openDialog('등록/수정할 수 없습니다.', true)
    }
  }, [profileForm, imageFile, profileData, uploadImage, user?.role])

  useEffect(() => {
    if (profileData) {
      setProfileForm({
        mainTitle: profileData.mainTitle,
        subTitle: profileData.subTitle,
        content: profileData.contents,
        imageUrl: profileData.imageUrl || '',
      })
    }
  }, [profileData])

  return {
    profileForm,
    dialogConfig,
    handleImageChange,
    saveProfile,
    setDialogConfig,
    handleFormChange,
  }
}
