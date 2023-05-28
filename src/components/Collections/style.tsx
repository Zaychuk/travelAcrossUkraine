import { AccordionSummary, Box, Typography } from '@mui/material'
import styled from 'styled-components'

export const Title = styled(Typography)`
  font-size: 22px !important;
  font-weight: 600 !important;
`
export const Btn = styled.button`
  display: none;
  padding: 4px;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f3f3f3;
  }
  &:first-of-type {
    margin-right: 3px;
    margin-left: auto;
  }
`
export const Summary = styled(AccordionSummary)`
  align-items: center;
  &:hover {
    ${Btn} {
      display: inline-block;
    }
  }
`
export const CategoryTitle = styled(Typography)`
  display: flex;
  align-items: center;
  margin-right: auto;
  height: 29px;
`
export const LocationContainer = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: calc(100vw - 312px);
  margin-bottom: 50px;
  &:last-of-type {
    margin-bottom: 0;
  }
`
export const NameContainer = styled.div`
  opacity: 0;
  transition: opacity 1.2s;
  position: absolute;
  display: flex;
  align-items: flex-end;
  height: 150px;
  width: 100%;
  background: linear-gradient(0deg, rgba(31, 31, 31, 1) 0%, rgba(0, 0, 0, 0) 90%);
  pointer-events: none;
  z-index: 1;
`
export const Name = styled(Typography)`
  color: white;
  margin-left: 30px !important;
  margin-right: auto !important;
  margin-bottom: -30px !important;
  font-size: 28px;
  opacity: 0;
  transition: margin-bottom 0.4s 0.3s, opacity 0.2s 0.4s;
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
  overflow-y: hidden;
  position: relative;
  &:hover {
    ${NameContainer} {
      opacity: 1;
    }
    ${Name} {
      opacity: 1;
      margin-bottom: 10px !important;
    }
    ${Link} {
      opacity: 1;
      margin-bottom: 0 !important;
    }
  }
`
export const Wrapper = styled.div`
  position: relative;
  &:hover {
    ${NameContainer} {
      opacity: 1;
    }
    ${Name} {
      opacity: 1;
      margin-bottom: 10px !important;
    }
    ${Link} {
      opacity: 1;
      margin-bottom: 0 !important;
    }
  }
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
