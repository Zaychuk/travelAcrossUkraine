import { FC, Fragment } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import { MultipleSelectCheckmarks } from '../../../../../ui'

const MapFilter: FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <Fragment>
      <Box component='form' noValidate onSubmit={handleSubmit}>
        <Grid container flexDirection='row' gap='10px' display={{ xs: 'none', xl: 'flex' }}>
          <MultipleSelectCheckmarks name='select' />
          <Button type='submit' variant='contained'>
            Show
          </Button>
        </Grid>
      </Box>
      <Box component='form' noValidate onSubmit={handleSubmit}>
        <Grid container flexDirection='row' gap='10px' display={{ xs: 'flex', xl: 'none' }}>
          <MultipleSelectCheckmarks name='select' />
          <Button type='submit' variant='contained'>
            Show
          </Button>
        </Grid>
      </Box>
    </Fragment>
  )
}

MapFilter.displayName = 'SignUp'

export { MapFilter }
