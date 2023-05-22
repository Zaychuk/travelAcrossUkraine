import { Typography } from '@mui/material'
import styled from 'styled-components'

export const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  z-index: 999;
`
export const Modal = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 12px;
`
export const Title = styled(Typography)`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
`
export const Close = styled.button`
  border-radius: 4px;
`
