import { Button, TableCell, TableRow } from '@mui/material'
import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-top: 20px !important;
`
export const AppBar = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 1;
`
export const Container = styled.div`
  position: relative;
  display: flex;
  gap: 50px;
  width: 200%;
  margin-left: -100% !important;
  padding-top: 30px;
  transition: margin-left 0.4s 0.2s;
  &[data-active='left'] {
    margin-left: 0 !important;
  }
`
export const PartL = styled.div`
  flex-grow: 1;
  padding-left: 15px;
`
export const PartR = styled.div`
  flex-grow: 1;
  padding-right: 15px;
`
export const AddL = styled(Button)`
  opacity: 0;
  position: absolute !important;
  bottom: -38px;
  right: 50%;
  &[data-active='left'] {
    opacity: 1;
  }
`
export const AddR = styled(Button)`
  opacity: 0;
  position: absolute !important;
  bottom: -38px;
  left: 50%;
  &[data-active='right'] {
    opacity: 1;
  }
`
export const TabL = styled(Button)`
  position: relative;
  flex-grow: 1;
  width: 50%;
  border-radius: 0 !important;
  opacity: 0.4;
  &[data-active='left'] {
    opacity: 1;
    border-bottom: 2px solid #00aaff;
  }
`
export const TabR = styled(Button)`
  position: relative;
  flex-grow: 1;
  width: 50%;
  border-radius: 0 !important;
  opacity: 0.4;

  &[data-active='right'] {
    opacity: 1;
    border-bottom: 2px solid #00aaff;
  }
`
export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #e9e9e9;
  }
`
export const HeaderRow = styled(TableRow)`
  font-size: 20px !important;
  font-weight: 600;
`
export const StyledTableCell = styled(TableCell)`
  font-size: 10px;
`
export const HeaderCell = styled(TableCell)`
  font-size: 20px !important;
  font-weight: 600 !important;
`
export const Btn = styled.button`
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
