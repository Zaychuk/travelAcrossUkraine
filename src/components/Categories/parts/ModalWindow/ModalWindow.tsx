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
  onClose: (data: LocationModalDataType | null) => void
}

export type LocationModalDataType = z.infer<typeof FormSchema>

export const ModalWindow: FC<ModalWindowProps> = ({ onClose }) => {
  const methods = useForm<LocationModalDataType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit: SubmitHandler<LocationModalDataType> = data => {
    methods.reset()
    onClose(data)
  }

  return (
    <S.ModalWrapper
      onClick={() => {
        onClose(null)
      }}
    >
      <S.Modal
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <S.Title>Зберегти фігуру</S.Title>
        <FormProvider {...methods}>
          <Box component='form' onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container sx={{ margin: '0', width: '370px', gap: '15px' }}>
              <Grid item xs={12}>
                <TextField
                  error={!!methods.formState.errors?.name?.message}
                  fullWidth
                  {...methods.register('name')}
                  id='name'
                  label='Ім`я фігури'
                />
                <S.ErrorMessage>{methods.formState.errors?.name?.message || null}</S.ErrorMessage>
              </Grid>
              <Grid item container xs={12} sx={{ justifyContent: 'space-between' }}>
                <Button
                  onClick={() => {
                    onClose(null)
                  }}
                  variant='outlined'
                >
                  Закрити
                </Button>
                <Button type='submit' variant='contained'>
                  Застосувати
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
