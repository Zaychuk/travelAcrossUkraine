import { Box, Button, Typography } from '@mui/material'
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
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 12px;
`

export const Title = styled(Typography)`
  font-size: 22px !important;
  font-weight: 600 !important;
`

export const LocationContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0px 30px 20px;
  border-radius: 12px;
  gap: 15px;
  width: 430px;
`

export const Name = styled(Typography)`
  font-size: 28px !important;
  font-weight: 600 !important;
  margin: 0 auto;
`
export const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  pointer-events: all;
  background-color: #ffffff;
  border-radius: 4px;
  opacity: 0;
  margin-bottom: -30px !important;
  transition: margin-bottom 0.4s 0.5s, opacity 0.25s 0.5s;
`
export const ImagesContainer = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  gap: 4px;
`
export const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  flex-shrink: 0;
`
export const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`
export const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin: 0 auto;
`
export const BtnContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: -20px;
  display: flex;
  gap: 15px;
`
export const Approve = styled(Button)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 20px;
  background-color: #368636 !important;
  color: white;
`
export const Decline = styled(Button)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 20px;
  background-color: #ad4040 !important;
  color: white;
`
