import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ReactPortalProps {
  children: ReactNode
  wrapperId: string
}

export const ReactPortal: FC<ReactPortalProps> = ({ children, wrapperId }) => {
  return createPortal(children, document.getElementById(wrapperId) as HTMLElement)
}
export default ReactPortal
