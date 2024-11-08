'use client'

import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {remark} from 'remark'
import html from 'remark-html'

import {createBlog} from '@/app/api/createBlog'
import Button from '@/components/Button'
import Input from '@/components/Input'
import MarkdownView from '@/components/MarkdownView'
import Textarea from '@/components/Textarea'
import Typography from '@/components/Typography'
import {useUser} from '@/store/user'

const MarkdownEditor = () => {
  const user = useUser(state => state.user)
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [content, setContent] = useState('')
  const [htmlContent, setHtmlContent] = useState('')

  const inputStyles =
    'w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500'

  const handleInputChange =
    (setter: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(event.target.value)
    }

  const convertMarkdownToHtml = useCallback(async (markdownBody: string) => {
    const processedContent = await remark().use(html).process(markdownBody)
    setHtmlContent(processedContent.toString())
  }, [])

  const handleCreate = useCallback(async () => {
    if (!title || !content) {
      return
    }

    await createBlog({id: user?.id ?? '', title, content, imageUrl})
  }, [content, imageUrl, title, user?.id])

  useEffect(() => {
    void convertMarkdownToHtml(content)
  }, [content, convertMarkdownToHtml])

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex justify-end items-center h-18">
        <Button onClick={handleCreate} className="border border-gray-300">
          <Typography text="게시글 등록" className="base2" />
        </Button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">제목</h2>
        <Input
          value={title}
          placeholder="제목을 입력해주세요."
          onChange={handleInputChange(setTitle)}
          className={inputStyles}
        />
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">메인 이미지</h2>
        <Input
          value={imageUrl}
          placeholder="메인 이미지 URL을 입력해주세요."
          onChange={handleInputChange(setImageUrl)}
          className={inputStyles}
        />
      </div>
      <div className="flex-1 flex flex-col mb-4">
        <h2 className="text-xl font-bold mb-2">미리보기</h2>
        <MarkdownView
          content={htmlContent}
          className="flex-1 overflow-y-auto p-4 border border-gray-300 rounded-md shadow-sm bg-white"
        />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">내용</h2>
        <Textarea
          value={content}
          placeholder="내용을 입력해주세요."
          onChange={handleInputChange(setContent)}
          className={inputStyles + ' h-48'}
        />
      </div>
    </div>
  )
}

export default MarkdownEditor
