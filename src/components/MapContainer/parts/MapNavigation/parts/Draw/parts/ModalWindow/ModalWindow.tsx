import { FC, useRef } from 'react'
import { useOnClickOutside } from 'hooks/useOnClickOutside'

import * as S from './style'

interface ModalWindowProps {
  onClose: () => void
}

export const ModalWindow: FC<ModalWindowProps> = ({ onClose }) => {
  const ref = useRef(null)

  useOnClickOutside(ref, (isClickedoutside: boolean) => {
    if (isClickedoutside) {
      onClose()
    }
  })
  return (
    <S.ModalWrapper>
      <S.Modal ref={ref}>
        <div> adsadadadadsad</div>
        <div> adsadadadadsad</div>
        <div> adsadadadadsad</div>
        <div> adsadadadadsad</div>
        <S.Close onClick={onClose}>Close</S.Close>
      </S.Modal>
    </S.ModalWrapper>
  )
}
ModalWindow.displayName = 'ModalWindow'
