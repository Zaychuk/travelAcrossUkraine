import { FC, Fragment, useState } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { MultipleSelectCheckmarks } from 'components/ui'

const MapFilter: FC = () => {
  const [open, setOpen] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('submit')

    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      select: data.get('select')
    })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false)
    }
  }

  return (
    <Fragment>
      <Box component='form' noValidate onSubmit={handleSubmit} display={{ xs: 'none', xl: 'block' }}>
        <Grid container flexDirection='row' gap='10px'>
          <MultipleSelectCheckmarks name='select' label='test' />
          <Button type='submit' variant='contained'>
            Show
          </Button>
        </Grid>
      </Box>

      <Box display={{ xs: 'block', xl: 'none' }}>
        <Button type='button' variant='contained' onClick={handleClickOpen}>
          Open select dialog
        </Button>
      </Box>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <Box component='form' noValidate onSubmit={handleSubmit}>
          <DialogTitle>Fill the form</DialogTitle>
          <DialogContent>
            <MultipleSelectCheckmarks name='select' label='test' />
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
      </Dialog>
    </Fragment>
  )
}

MapFilter.displayName = 'SignUp'

export { MapFilter }
