/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, MouseEvent, useState } from 'react'
import ReactPortal from 'components/core/ReactPortal/ReactPortal'
import { Table, TableBody, TableHead } from '@mui/material'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { ModalWindow } from './parts'
import * as S from './style'

export default function Categories() {
  const arr1 = [
    {
      name: 'Категорія 1'
    },
    {
      name: 'Категорія 1'
    },
    {
      name: 'Категорія 1'
    },
    {
      name: 'Категорія 1'
    },
    {
      name: 'Категорія 1'
    },
    {
      name: 'Категорія 1'
    },
    {
      name: 'Категорія 1'
    },
    {
      name: 'Категорія 1'
    }
  ]
  const [showModal, setShowModal] = useState<boolean>(false)

  const [value, setValue] = useState('left')

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleEditCategory = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  }
  const handleDeleteCategory = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  }

  const handleSave = (modalData: any) => {
    console.log('save', modalData)
  }

  const handleOpenModal = () => {
    setShowModal(true)
  }
  const handleCloseModal = (modalData: any | null) => {
    setShowModal(false)
    handleSave(modalData)
  }

  return (
    <Fragment>
      <ReactPortal wrapperId='modal-root'>{showModal && <ModalWindow onClose={handleCloseModal} />}</ReactPortal>

      <S.Wrapper>
        <S.AppBar>
          <S.TabL
            data-active={value}
            onClick={e => {
              handleTabChange(e, 'left')
            }}
          >
            Вподобане
            <HealthAndSafetyIcon color='success' sx={{ position: 'absolute', right: '10px' }} />
          </S.TabL>
          <S.TabR
            data-active={value}
            onClick={e => {
              handleTabChange(e, 'right')
            }}
          >
            <ReportProblemIcon color='error' sx={{ position: 'absolute', left: '10px' }} />
            Небезпека
          </S.TabR>
          <S.AddL variant='contained' data-active={value} onClick={handleOpenModal}>
            Додати
          </S.AddL>
          <S.AddR variant='contained' data-active={value} onClick={handleOpenModal}>
            Додати
          </S.AddR>
        </S.AppBar>

        <S.Container data-active={value}>
          <S.PartL>
            <Table>
              <TableHead>
                <S.HeaderRow>
                  <S.HeaderCell>Назва</S.HeaderCell>
                  <S.HeaderCell sx={{ width: '100px' }}>Дія</S.HeaderCell>
                </S.HeaderRow>
              </TableHead>
              <TableBody>
                {arr1.map(row => (
                  <S.StyledTableRow key={row.name}>
                    <S.StyledTableCell component='td' scope='row'>
                      {row.name}
                    </S.StyledTableCell>
                    <S.StyledTableCell component='td' scope='row'>
                      <S.Btn onClick={handleEditCategory}>
                        <EditIcon sx={{ width: '16px', height: '16px', color: '#00AAFF' }} />
                      </S.Btn>
                      <S.Btn onClick={handleDeleteCategory}>
                        <DeleteIcon sx={{ width: '16px', height: '16px', color: 'rgb(211, 47, 47)' }} />
                      </S.Btn>
                    </S.StyledTableCell>
                  </S.StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </S.PartL>
          <S.PartR>
            <Table>
              <TableHead>
                <S.HeaderRow>
                  <S.HeaderCell>Назва</S.HeaderCell>
                  <S.HeaderCell sx={{ width: '100px' }}>Дія</S.HeaderCell>
                </S.HeaderRow>
              </TableHead>
              <TableBody>
                {arr1.map(row => (
                  <S.StyledTableRow key={row.name}>
                    <S.StyledTableCell component='td' scope='row'>
                      {row.name}
                    </S.StyledTableCell>
                    <S.StyledTableCell component='td' scope='row'>
                      <S.Btn onClick={handleEditCategory}>
                        <EditIcon sx={{ width: '16px', height: '16px', color: '#00AAFF' }} />
                      </S.Btn>
                      <S.Btn onClick={handleDeleteCategory}>
                        <DeleteIcon sx={{ width: '16px', height: '16px', color: 'rgb(211, 47, 47)' }} />
                      </S.Btn>
                    </S.StyledTableCell>
                  </S.StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </S.PartR>
        </S.Container>
      </S.Wrapper>
    </Fragment>
  )
}

Categories.displayName = 'Categories'

export { Categories }
