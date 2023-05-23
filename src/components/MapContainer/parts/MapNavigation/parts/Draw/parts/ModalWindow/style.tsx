import { Grid, Typography } from '@mui/material'
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
export const ErrorMessage = styled(Typography)`
  font-size: 12px;
  /* width: 100%; */
  /* margin-top: -20px; */
  margin-left: 15px;
  color: rgb(211, 47, 47);
`
export const ImagesContainer = styled(Grid)`
  max-width: 386px;
  overflow-y: auto;
  padding-bottom: 5px;
`
export const Images = styled(Grid)`
  gap: 10px;
  align-items: center;
  flex-wrap: nowrap;
`
export const ImgWrapper = styled.div`
  width: 80px;
  height: 80px;
  border: 1px dashed grey;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
`
export const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`
export const Label = styled.label`
  border: 1px dashed grey;
  width: 80px;
  height: 80px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  cursor: pointer;
`
