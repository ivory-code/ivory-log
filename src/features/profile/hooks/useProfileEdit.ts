import {useCallback, useReducer, useEffect} from 'react'

import {createProfile} from '@/app/api/createProfile'
import {editProfile} from '@/app/api/editProfile'
import {
  initialProfileState,
  profileReducer,
  type ProfileState,
} from '@/features/profile/reducer/profileReducer'
import {SKILLS, TOOLS} from '@/shared/constants'
import {useUser} from '@/store/user'
import {createBrowserClient} from '@/supabase/client'

const FILE_MAX_SIZE = 1048576 // 1MB 제한
const supabase = createBrowserClient()

export const useProfileEdit = () => {
  const user = useUser(state => state.user)

  const [state, dispatch] = useReducer(profileReducer, initialProfileState)

  // 재사용 가능한 다이얼로그 표시 함수
  const showDialog = useCallback(
    (message: string, isError: boolean = false) => {
      dispatch({
        type: 'SET_DIALOG',
        dialog: {isVisible: true, isError, message},
      })
    },
    [],
  )

  const validateFile = useCallback(
    (file: File): boolean => {
      if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(file.name)) {
        showDialog('영문 파일명만 허용됩니다.', true)
        return false
      }
      if (file.size > FILE_MAX_SIZE) {
        showDialog('파일 용량은 1MB 이하만 허용됩니다.', true)
        return false
      }
      return true
    },
    [showDialog],
  )

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file = event.target.files[0]
        if (!validateFile(file)) return

        dispatch({type: 'SET_IMAGE_FILE', file})
        dispatch({
          type: 'SET_FORM',
          field: 'imageUrl',
          value: URL.createObjectURL(file),
        })
      }
    },
    [validateFile],
  )

  const uploadImage = useCallback(
    async (file: File): Promise<string | null> => {
      if (!validateFile(file)) return null

      try {
        const {error} = await supabase.storage
          .from('images')
          .upload(file.name, file, {cacheControl: '0', upsert: true})

        if (error) {
          showDialog('이미지 업로드에 실패했습니다.', true)
          return null
        }

        const {data: publicUrlData} = supabase.storage
          .from('images')
          .getPublicUrl(file.name)
        return publicUrlData.publicUrl || ''
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error uploading image:', error)
        showDialog('이미지 업로드에 실패했습니다.', true)
        return null
      }
    },
    [validateFile, showDialog],
  )

  const saveProfile = useCallback(async () => {
    try {
      const uploadedImageUrl = state.imageFile
        ? await uploadImage(state.imageFile)
        : state.profileForm.imageUrl

      if (!uploadedImageUrl) return

      const profilePayload = {
        role: user?.role ?? '',
        contents: state.profileForm.content,
        mainTitle: state.profileForm.mainTitle,
        subTitle: state.profileForm.subTitle,
        skills: SKILLS,
        tools: TOOLS,
        imageUrl: uploadedImageUrl,
      }

      await (state.profileForm
        ? editProfile({...profilePayload})
        : createProfile({...profilePayload}))

      showDialog('프로필이 성공적으로 저장되었습니다.')
    } catch (error) {
      showDialog('프로필 저장에 실패했습니다.', true)
    }
  }, [state.imageFile, state.profileForm, uploadImage, user?.role, showDialog])

  const fetchProfile = useCallback(async () => {
    try {
      const response = await fetch(`/api/main`, {
        method: 'GET',
      })

      const data = await response.json()
      const profileData = data.profileData[0]

      if (profileData) {
        dispatch({
          type: 'SET_PROFILE',
          profile: {
            mainTitle: profileData.mainTitle,
            subTitle: profileData.subTitle,
            content: profileData.contents,
            imageUrl: profileData.imageUrl ?? '',
          },
        })
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching profile data:', error)
    }
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return {
    fetchProfile,
    profileForm: state.profileForm,
    dialogConfig: state.dialogConfig,
    handleImageChange,
    saveProfile,
    handleFormChange: (
      field: keyof ProfileState['profileForm'],
      value: string,
    ) => dispatch({type: 'SET_FORM', field, value}),
    resetDialog: () => dispatch({type: 'RESET_DIALOG'}),
  }
}
