import { FC, Fragment, useState } from 'react'
import { z } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { MultipleSelectCheckmarks, NavButton } from 'components/ui'

const FormSchema = z.object({
  select: z.array(z.string()).optional(),
  t: z.array(z.string()).optional()
})

type FormSchemaType = z.infer<typeof FormSchema>

const MapFilter: FC = () => {
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      select: []
    }
  })

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit: SubmitHandler<FormSchemaType> = data => {
    console.log(data)
    methods.reset()
    handleClose()
  }

  return (
    <Fragment>
      <FormProvider {...methods}>
        <Box component='form' onSubmit={methods.handleSubmit(onSubmit)} display={{ xs: 'none', xl: 'block' }}>
          <Grid container flexDirection='row' gap='10px'>
            <MultipleSelectCheckmarks control={methods.control} name='select' label='test' />
            <Button type='submit' variant='contained'>
              Show
            </Button>
          </Grid>
        </Box>
      </FormProvider>

      <Box display={{ xs: 'block', xl: 'none' }}>
        <NavButton tooltipTitle='Filter' tooltipPlacement='right-start' onClick={handleClickOpen}>
          <FilterAltIcon />
        </NavButton>
      </Box>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <FormProvider {...methods}>
          <Box component='form' onSubmit={methods.handleSubmit(onSubmit)}>
            <DialogTitle>Fill the form</DialogTitle>
            <DialogContent>
              <MultipleSelectCheckmarks control={methods.control} name='select' label='test' />
            </DialogContent>
            <DialogActions>
              <Button type='button' onClick={handleClose}>
                Cancel
              </Button>
              <Button type='submit' variant='contained'>
                Ok
              </Button>
            </DialogActions>
          </Box>
        </FormProvider>
      </Dialog>
    </Fragment>
  )
}

MapFilter.displayName = 'SignUp'

export { MapFilter }
