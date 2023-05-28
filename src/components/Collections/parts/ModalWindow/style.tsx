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
  font-size: 28px !important;
  font-weight: 600 !important;
  margin-bottom: 20px !important;
`
export const ErrorMessage = styled(Typography)`
  font-size: 12px !important;
  margin-left: 15px;
  color: rgb(211, 47, 47);
`
