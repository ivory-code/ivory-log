import {ReactElement} from 'react'

interface Props {
  children?: ReactElement
  style?: string
}

const Wrapper = ({children, style}: Props) => {
  return <div className={`mx-auto px-5 ${style}`}>{children}</div>
}

export default Wrapper
