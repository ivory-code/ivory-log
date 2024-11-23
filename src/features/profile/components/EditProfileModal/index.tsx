'use client'

import {forwardRef, useImperativeHandle, useState} from 'react'

import {useProfileEdit} from '@/features/profile/hooks/useProfileEdit'
import Button from '@/shared/components/Button'
import Image from '@/shared/components/Image'
import Input from '@/shared/components/Input'
import Modal from '@/shared/components/Modal'
import Textarea from '@/shared/components/Textarea'
import Typography from '@/shared/components/Typography'

export interface EditProfileModalRef {
  openModal: () => void
  closeModal: () => void
}

const EditProfileModal = forwardRef<EditProfileModalRef>((_, ref) => {
  const {
    profileForm,
    dialogConfig,
    handleImageChange,
    saveProfile,
    handleFormChange,
  } = useProfileEdit()

  const [isModalVisible, setIsModalVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    openModal() {
      setIsModalVisible(true)
    },
    closeModal() {
      setIsModalVisible(false)
    },
  }))

  const handleSave = async () => {
    await saveProfile() // 프로필 저장
  }

  return (
    <Modal
      classWrap="max-w-[48rem] md:min-h-screen-ios md:rounded-none"
      onClose={() => setIsModalVisible(false)}
      isVisible={isModalVisible}>
      <div className="flex flex-col p-4">
        {/* 상단 버튼 */}
        <div className="flex justify-end items-center h-18">
          <Button
            type="submit"
            onClick={handleSave}
            className="border border-gray-300">
            <Typography text="저장하기" className="base2" />
          </Button>
        </div>

        {/* 성공 메시지 */}
        {dialogConfig.message && !dialogConfig.isError && (
          <div className="p-4 mb-4 text-green-800 bg-green-200 rounded">
            <Typography text={dialogConfig.message} className="base2" />
          </div>
        )}

        {/* 제목 필드 */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">제목</h2>
          <Input
            value={profileForm.mainTitle}
            onChange={e => handleFormChange('mainTitle', e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* 부제목 필드 */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">부제목</h2>
          <Input
            value={profileForm.subTitle}
            onChange={e => handleFormChange('subTitle', e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* 내용 필드 */}
        <div className="flex flex-row">
          <div className="mt-4 w-2/3 mr-2">
            <h2 className="text-xl font-bold mb-2">내용</h2>
            <Textarea
              value={profileForm.content}
              onChange={e => handleFormChange('content', e.target.value)}
              className="w-full h-48 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* 이미지 업로드 */}
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
              <div className="mt-2 flex justify-center items-center">
                <Image
                  src={profileForm.imageUrl}
                  alt="Uploaded"
                  className="max-w-full h-auto rounded-md"
                  width={140}
                  height={115}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
})

EditProfileModal.displayName = 'EditProfileModal'

export default EditProfileModal
