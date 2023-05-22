import { FC, useRef } from 'react'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { z } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, Grid, TextField } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'

import * as S from './style'

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Поле обов`язкове' }),
  description: z.string()
})

interface ModalWindowProps {
  onClose: () => void
}

type FormSchemaType = z.infer<typeof FormSchema>

export const ModalWindow: FC<ModalWindowProps> = ({ onClose }) => {
  const ref = useRef(null)

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  useOnClickOutside(ref, (isClickedoutside: boolean) => {
    if (isClickedoutside) {
      onClose()
    }
  })

  const onSubmit: SubmitHandler<FormSchemaType> = data => {
    console.log(data)
    methods.reset()
    // onClose()
  }

  console.log(methods.formState.errors)

  return (
    <S.ModalWrapper>
      <S.Modal ref={ref}>
        <S.Title>Зберегти фігуру</S.Title>
        <FormProvider {...methods}>
          <Box component='form' onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  helperText={methods.formState.errors?.name?.message || null}
                  {...methods.register('name')}
                  id='name'
                  label='Ім`я фігури'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  helperText={methods.formState.errors?.description?.message || null}
                  multiline
                  rows={4}
                  {...methods.register('description')}
                  id='name'
                  label='Ім`я фігури'
                />
              </Grid>

              <Button type='submit' variant='contained'>
                Застосувати
              </Button>
            </Grid>
          </Box>
        </FormProvider>
        <S.Close onClick={onClose}>Close</S.Close>
      </S.Modal>
    </S.ModalWrapper>
  )
}
ModalWindow.displayName = 'ModalWindow'
