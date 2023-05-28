import { TableCell, TableRow } from '@mui/material'
import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-top: 20px !important;
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
  font-size: 14px !important;
`
export const HeaderCell = styled(TableCell)`
  font-size: 18px !important;
  font-weight: 500 !important;
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
