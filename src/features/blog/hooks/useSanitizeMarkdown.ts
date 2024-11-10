import DOMPurify from 'dompurify'
import {marked} from 'marked'
import {useEffect, useState} from 'react'

// 마크다운을 HTML로 변환하고 정리하는 훅
export const useSanitizeMarkdown = (markdown: string): string => {
  const [sanitizedContent, setSanitizedContent] = useState('')

  const renderPreviewContent = async (markdown: string): Promise<string> => {
    const html = await marked.parse(markdown) // Promise 해제
    const sanitizedHtml = DOMPurify.sanitize(html.replace(/<img[^>]*>/g, '')) // 이미지 태그 제거 후 정제
    const previewText =
      sanitizedHtml.length > 100
        ? sanitizedHtml.slice(0, 100) + '...'
        : sanitizedHtml // 100자 제한
    return previewText
  }

  useEffect(() => {
    const convertContent = async () => {
      const htmlContent = await renderPreviewContent(markdown)
      setSanitizedContent(htmlContent)
    }

    convertContent()
  }, [markdown])

  return sanitizedContent
}
