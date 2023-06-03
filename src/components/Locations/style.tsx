import { Box, Button, Typography } from '@mui/material'
import styled from 'styled-components'

export const Title = styled(Typography)`
  font-size: 22px !important;
  font-weight: 600 !important;
`

export const LocationContainer = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  border-radius: 12px;
  gap: 10px;
  width: calc(100vw - 312px);
  margin-bottom: 50px;
  border: 1px solid black;
  &:last-of-type {
    margin-bottom: 0;
  }
`

export const Name = styled(Typography)`
  font-size: 28px !important;
  font-weight: 500 !important;
  margin: 0 auto !important;
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
