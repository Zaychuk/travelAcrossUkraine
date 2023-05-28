/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, MouseEvent, useEffect, useState } from 'react'
import ReactPortal from 'components/core/ReactPortal/ReactPortal'
import { Table, TableBody, TableHead } from '@mui/material'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { ConfirmModal } from 'components/ui'
import { ITypeWithCategories, getAllTypesWithCategories } from 'api/typesApi'
import { createCategory, deleteCategory, editCategory } from 'api/categoriesApi'

import { ModalWindow } from './parts'
import * as S from './style'

export default function Categories() {
  const [types, setTypes] = useState<ITypeWithCategories[]>([])

  const [typeId, setTypeId] = useState('left')

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTypeId(newValue)
  }

  const [showModal, setShowModal] = useState<boolean>(false)
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
  const [editableCategory, setEditableCategory] = useState<{ id?: string; name?: string }>()

  const handleOpenModal = (e: MouseEvent<HTMLButtonElement>, id?: string, name?: string) => {
    e.stopPropagation()
    setShowModal(true)
    if (id) {
      setEditableCategory({ id, name })
    }
  }
  const handleCloseModal = () => {
    setShowModal(false)
    setEditableCategory({})
  }
  const handleCreate = async (name: string) => {
    try {
      await createCategory({ name, typeId: typeId === 'left' ? types[0].id : types[1].id })
      fetchTypesWithCategories()
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = async (id: string, name: string) => {
    try {
      await editCategory(id, { name, typeId: typeId === 'left' ? types[0].id : types[1].id })
      fetchTypesWithCategories()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteCategory = async () => {
    if (editableCategory?.id) {
      try {
        await deleteCategory(editableCategory.id)
        fetchTypesWithCategories()
      } catch (err) {
        console.log(err)
      }
    }
  }
  const fetchTypesWithCategories = () => {
    getAllTypesWithCategories()
      .then(data => {
        setTypes(data)
        return true
      })
      .catch(err => console.log(err))
  }
  const handleSubmit = (id?: string, name?: string) => {
    if (id && name && name !== editableCategory?.name) {
      handleEdit(id, name)
    }
    if (!id && name) {
      handleCreate(name)
    }
  }

  const handleOpenConfirmModal = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation()
    setShowConfirmModal(true)
    setEditableCategory({ id })
  }
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false)
    setEditableCategory({})
  }

  useEffect(() => {
    fetchTypesWithCategories()
  }, [])

  return (
    <Fragment>
      <ReactPortal wrapperId='modal-root'>
        {showModal && (
          <ModalWindow editableCategory={editableCategory} onClose={handleCloseModal} onSubmit={handleSubmit} />
        )}
      </ReactPortal>
      <ReactPortal wrapperId='modal-root'>
        {showConfirmModal && (
          <ConfirmModal
            title='Увага'
            description='Дійсно хочете видалити категорію?'
            onClose={handleCloseConfirmModal}
            handleSubmit={handleDeleteCategory}
          />
        )}
      </ReactPortal>
      <S.Wrapper>
        <S.AppBar>
          <S.TabL
            data-active={typeId}
            onClick={e => {
              handleTabChange(e, 'left')
            }}
          >
            Туристичне місце
            <HealthAndSafetyIcon color='success' sx={{ position: 'absolute', right: '10px' }} />
          </S.TabL>
          <S.TabR
            data-active={typeId}
            onClick={e => {
              handleTabChange(e, 'right')
            }}
          >
            <ReportProblemIcon color='error' sx={{ position: 'absolute', left: '10px' }} />
            Екологічна проблема
          </S.TabR>
          <S.AddL
            variant='contained'
            data-active={typeId}
            onClick={e => {
              handleOpenModal(e)
            }}
          >
            Додати
          </S.AddL>
          <S.AddR
            variant='contained'
            data-active={typeId}
            onClick={e => {
              handleOpenModal(e)
            }}
          >
            Додати
          </S.AddR>
        </S.AppBar>

        <S.Container data-active={typeId}>
          <S.PartL>
            <Table>
              <TableHead>
                <S.HeaderRow>
                  <S.HeaderCell>Назва</S.HeaderCell>
                  <S.HeaderCell sx={{ width: '100px' }}>Дія</S.HeaderCell>
                </S.HeaderRow>
              </TableHead>
              <TableBody>
                {types[0]?.categories?.map(row => (
                  <S.StyledTableRow key={row.name}>
                    <S.StyledTableCell component='td' scope='row'>
                      {row.name}
                    </S.StyledTableCell>
                    <S.StyledTableCell component='td' scope='row'>
                      <S.Btn
                        onClick={e => {
                          handleOpenModal(e, row.id, row.name)
                        }}
                      >
                        <EditIcon sx={{ width: '16px', height: '16px', color: '#00AAFF' }} />
                      </S.Btn>
                      <S.Btn
                        onClick={e => {
                          handleOpenConfirmModal(e, row.id)
                        }}
                      >
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
                {types[1]?.categories?.map(row => (
                  <S.StyledTableRow key={row.name}>
                    <S.StyledTableCell component='td' scope='row'>
                      {row.name}
                    </S.StyledTableCell>
                    <S.StyledTableCell component='td' scope='row'>
                      <S.Btn
                        onClick={e => {
                          handleOpenModal(e, row.id, row.name)
                        }}
                      >
                        <EditIcon sx={{ width: '16px', height: '16px', color: '#00AAFF' }} />
                      </S.Btn>
                      <S.Btn
                        onClick={e => {
                          handleOpenConfirmModal(e, row.id)
                        }}
                      >
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
