/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable dot-notation */
/* eslint-disable max-lines-per-function */
import { FC } from 'react'
import { Box, Button, Grid } from '@mui/material'

import * as S from './style'

interface ModalWindowProps {
  title: string
  description: string
  onClose: () => void
  handleSubmit: () => void
}

export const ConfirmModal: FC<ModalWindowProps> = ({ onClose, handleSubmit, description, title }) => {
  return (
    <S.ModalWrapper onClick={onClose}>
      <S.Modal
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <S.Title>{title}</S.Title>
        <Box>
          <Grid container sx={{ margin: '0', justifyContent: 'center', gap: '15px' }}>
            <S.Description>{description}</S.Description>
            <Grid item container xs={12} sx={{ justifyContent: 'space-between', padding: '0 50px' }}>
              <Button onClick={onClose} sx={{ width: '100px' }} variant='outlined'>
                Ні
              </Button>
              <Button
                onClick={() => {
                  handleSubmit()
                  onClose()
                }}
                sx={{ width: '100px' }}
                variant='contained'
              >
                Так
              </Button>
            </Grid>
          </Grid>
        </Box>
      </S.Modal>
    </S.ModalWrapper>
  )
}
ConfirmModal.displayName = 'ConfirmModal'
