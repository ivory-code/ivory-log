import {type ChangeEvent} from 'react'

import Image from '@/shared/components/Image'
import Typography from '@/shared/components/Typography'

interface Props {
  label: string
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void
  imageUrl?: string
}

const ImageUploader = ({label, onImageChange, imageUrl}: Props) => (
  <div className="mb-4">
    <Typography text={label} className="text-xl font-bold mb-2" />
    <div className="flex items-center">
      <label
        htmlFor="file-upload"
        className="border border-gray-300 p-2 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 mr-4 flex items-center gap-2">
        <Typography text={label} className="base2" />
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
        />
      </label>
      {imageUrl && (
        <div className="flex justify-center items-center">
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            className="max-w-full h-auto rounded-md mr-4"
            width={140}
            height={115}
          />
        </div>
      )}
    </div>
  </div>
)

export default ImageUploader
