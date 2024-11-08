import {type ChangeEvent} from 'react'

import Image from '@/components/Image'
import Typography from '@/components/Typography'

interface Props {
  label: string
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void
  imageUrl?: string
}

const ImageUpload = ({label, onImageChange, imageUrl}: Props) => (
  <div className="mb-4">
    <h2 className="text-xl font-bold mb-2">{label}</h2>
    <div className="flex items-center">
      <label className="border border-gray-300 p-2 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 mr-4">
        <Typography text={label} className="base2" />
        <input
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

export default ImageUpload
