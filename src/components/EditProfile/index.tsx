'use client'

import axios from 'axios'
import {
  type ChangeEvent,
  type Dispatch,
  forwardRef,
  type SetStateAction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

import {createProfile} from '@/app/api/createProfile'
import {editProfile} from '@/app/api/editProfile'
import Button from '@/components/Button'
import Dialog from '@/components/Dialog'
import {SKILLS, TOOLS} from '@/components/EditProfile/constants'
import Image from '@/components/Image'
import Input from '@/components/Input'
import Modal from '@/components/Modal'
import Textarea from '@/components/Textarea'
import Typography from '@/components/Typography'
import {useUser} from '@/store/user'
import {createBrowserClient} from '@/supabase/client'
import {type ProfileData} from '@/templates/MainPage'

const FILE_MAX_SIZE = 1048576
const supabase = createBrowserClient()

interface EditProfileModalProps {}

export interface EditProfileModalRef {
  openModal: () => void
  closeModal: () => void
}

const EditProfileModal = forwardRef<EditProfileModalRef, EditProfileModalProps>(
  (_, ref) => {
    const user = useUser(state => state.user)

    const [profileData, setProfileData] = useState<ProfileData | undefined>(
      undefined,
    )
    const [mainTitle, setMainTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [content, setContent] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState<string>('')
    const [dialogConfig, setDialogConfig] = useState({
      isVisible: false,
      isError: false,
      message: '',
    })
    const [isModalVisible, setIsModalVisible] = useState(false)

    useImperativeHandle(ref, () => ({
      openModal() {
        setIsModalVisible(true)
      },
      closeModal() {
        setIsModalVisible(false)
      },
    }))

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

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file = event.target.files[0]
        if (!validateFile(file)) return

        setImageFile(file)
        setImageUrl(URL.createObjectURL(file))
      }
    }

    const handleSubmitButton = () => openDialog('저장하시겠습니까?', false)

    const handleChange = useCallback(
      (setter: Dispatch<SetStateAction<string>>) =>
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          setter(event.target.value),
      [],
    )

    const uploadImage = useCallback(
      async (file: File) => {
        if (!validateFile(file)) return null

        const {error} = await supabase.storage
          .from('images')
          .upload(file.name, file, {cacheControl: '0', upsert: true})

        if (error) {
          openDialog('이미지 업로드에 실패했습니다.', true)
          return null
        }

        const {data: publicUrlData} = supabase.storage
          .from('images')
          .getPublicUrl(file.name)
        return publicUrlData.publicUrl || ''
      },
      [validateFile],
    )

    const fetchProfileData = useCallback(async () => {
      try {
        const {data} = await axios.get<{profileData: ProfileData[]}>(
          '/api/editProfile',
        )
        const profile = data.profileData[0]
        setProfileData(profile)
        setMainTitle(profile.mainTitle ?? '')
        setSubTitle(profile.subTitle ?? '')
        setContent(profile.contents ?? '')
        setImageUrl(profile.imageUrl ?? '')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching profile data:', error)
      }
    }, [])

    const handleSaveProfile = useCallback(async () => {
      try {
        const uploadedImageUrl = imageFile
          ? await uploadImage(imageFile)
          : imageUrl
        if (!uploadedImageUrl) return

        const profilePayload = {
          role: user?.role ?? '',
          contents: content,
          mainTitle,
          subTitle,
          skills: SKILLS,
          tools: TOOLS,
          imageUrl: uploadedImageUrl,
        }

        const updatedProfile = profileData
          ? await editProfile(profilePayload)
          : await createProfile(profilePayload)

        if (updatedProfile) {
          setDialogConfig(prev => ({
            ...prev,
            isVisible: false,
            isError: false,
          }))
          setProfileData(updatedProfile)
        }
      } catch (error) {
        openDialog('등록/수정할 수 없습니다.', true)
      } finally {
        setIsModalVisible(false)
      }
    }, [
      content,
      imageFile,
      imageUrl,
      mainTitle,
      profileData,
      subTitle,
      uploadImage,
      user?.role,
    ])

    const handleConfirmDialog = useCallback(() => {
      dialogConfig.isError
        ? setDialogConfig(prev => ({...prev, isVisible: false}))
        : handleSaveProfile()
    }, [dialogConfig.isError, handleSaveProfile])

    useEffect(() => {
      fetchProfileData()
    }, [fetchProfileData])

    return (
      <Modal
        classWrap="max-w-[48rem] md:min-h-screen-ios md:rounded-none"
        onClose={() => setIsModalVisible(false)}
        isVisible={isModalVisible}>
        <div className="flex flex-col p-4">
          <div className="flex justify-end items-center h-18">
            <Button
              type="submit"
              onClick={handleSubmitButton}
              className="border border-gray-300">
              <Typography text="홈 추가/수정" className="base2" />
            </Button>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">제목</h2>
            <Input
              value={mainTitle}
              onChange={handleChange(setMainTitle)}
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">부제목</h2>
            <Input
              value={subTitle}
              onChange={handleChange(setSubTitle)}
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-row">
            <div className="mt-4 w-2/3 mr-2">
              <h2 className="text-xl font-bold mb-2">내용</h2>
              <Textarea
                value={content}
                onChange={handleChange(setContent)}
                className="w-full h-48 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-1/3">
              <div className="flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold">메인 이미지</h2>
                  <label
                    htmlFor="file-upload"
                    className="border border-gray-300 p-2 rounded-md shadow-sm cursor-pointer hover:bg-gray-100">
                    <Typography text="추가" className="base2" />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                {imageUrl && (
                  <div className="mt-2 flex justify-center items-center">
                    <Image
                      src={imageUrl}
                      alt="Uploaded"
                      className="max-w-full h-auto rounded-md"
                      width={140}
                      height={115}
                    />
                  </div>
                )}
              </div>
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
      </Modal>
    )
  },
)

EditProfileModal.displayName = 'EditProfileModal'

export default EditProfileModal
