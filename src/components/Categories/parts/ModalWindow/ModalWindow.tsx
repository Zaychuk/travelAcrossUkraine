/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable dot-notation */
/* eslint-disable max-lines-per-function */
import { FC } from 'react'
import { z } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, Grid, TextField } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'

import * as S from './style'

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Поле обов`язкове' })
})

interface ModalWindowProps {
  editableCategory?: { id?: string; name?: string }
  onClose: () => void
  onSubmit: (id?: string, name?: string) => void
}

export type LocationModalDataType = z.infer<typeof FormSchema>

export const ModalWindow: FC<ModalWindowProps> = ({ onClose, editableCategory, onSubmit }) => {
  const methods = useForm<LocationModalDataType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: editableCategory?.name || ''
    }
  })

  const submit: SubmitHandler<LocationModalDataType> = data => {
    methods.reset()
    onSubmit(editableCategory?.id, data.name)
    onClose()
  }

  return (
    <S.ModalWrapper
      onClick={() => {
        onClose()
      }}
    >
      <S.Modal
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <S.Title>Створення колекції</S.Title>
        <FormProvider {...methods}>
          <Box component='form' onSubmit={methods.handleSubmit(submit)}>
            <Grid container sx={{ margin: '0', width: '370px', gap: '15px' }}>
              <Grid item xs={12}>
                <TextField
                  error={!!methods.formState.errors?.name?.message}
                  fullWidth
                  {...methods.register('name')}
                  id='name'
                  label='Назва колекції'
                />
                <S.ErrorMessage>{methods.formState.errors?.name?.message || null}</S.ErrorMessage>
              </Grid>
              <Grid item container xs={12} sx={{ justifyContent: 'space-between', padding: '0 25px' }}>
                <Button
                  onClick={() => {
                    onClose()
                  }}
                  variant='outlined'
                >
                  Закрити
                </Button>
                <Button type='submit' variant='contained'>
                  Зберегти
                </Button>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </S.Modal>
    </S.ModalWrapper>
  )
}
ModalWindow.displayName = 'ModalWindow'
