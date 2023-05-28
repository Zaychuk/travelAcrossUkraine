/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState } from 'react'
import { Table, TableBody, TableHead } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ReactPortal from 'components/core/ReactPortal/ReactPortal'
import { ConfirmModal } from 'components/ui'
import { IUser, getAllUsers, deleteUser } from 'api/usersApi'

import * as S from './style'

export default function Users() {
  const [showModal, setShowModal] = useState<boolean>(false)

  const [editableUser, setEditableUser] = useState<string>('')

  const [usersInfo, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = () => {
    getAllUsers()
      .then(data => setUsers(data))
      .catch(err => console.log(err))
  }

  const handleDeleteUser = async () => {
    if (editableUser) {
      try {
        await deleteUser(editableUser)
        fetchUsers()
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleOpenModal = (id: string) => {
    setShowModal(true)
    setEditableUser(id)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <Fragment>
      <ReactPortal wrapperId='modal-root'>
        {showModal && (
          <ConfirmModal
            title='Увага'
            description='Дійсно хочете видалити користувача?'
            onClose={handleCloseModal}
            handleSubmit={handleDeleteUser}
          />
        )}
      </ReactPortal>
      <S.Wrapper>
        <Table>
          <TableHead>
            <S.HeaderRow>
              <S.HeaderCell>Псевдонім</S.HeaderCell>
              <S.HeaderCell>Ім'я</S.HeaderCell>
              <S.HeaderCell>Прізвище</S.HeaderCell>
              <S.HeaderCell>Email</S.HeaderCell>
              <S.HeaderCell>Роль</S.HeaderCell>
              <S.HeaderCell sx={{ width: '100px' }}>Дія</S.HeaderCell>
            </S.HeaderRow>
          </TableHead>
          <TableBody>
            {usersInfo?.map(user => (
              <S.StyledTableRow key={user.username}>
                <S.StyledTableCell component='td' scope='row'>
                  {user.username}
                </S.StyledTableCell>
                <S.StyledTableCell component='td' scope='row'>
                  {user.givenName}
                </S.StyledTableCell>
                <S.StyledTableCell component='td' scope='row'>
                  {user.surname}
                </S.StyledTableCell>
                <S.StyledTableCell component='td' scope='row'>
                  {user.emailAddress}
                </S.StyledTableCell>
                <S.StyledTableCell component='td' scope='row'>
                  {user.role}
                </S.StyledTableCell>
                <S.StyledTableCell component='td' scope='row'>
                  <S.Btn
                    onClick={() => {
                      handleOpenModal(user.id)
                    }}
                  >
                    {user.role !== 'Admin' && (
                      <DeleteIcon sx={{ width: '16px', height: '16px', color: 'rgb(211, 47, 47)' }} />
                    )}
                  </S.Btn>
                </S.StyledTableCell>
              </S.StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </S.Wrapper>
    </Fragment>
  )
}

Users.displayName = 'Users'

export { Users }
