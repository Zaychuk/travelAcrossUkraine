import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Link, useNavigate } from 'react-router-dom'
import { login } from 'api/authApi'

const theme = createTheme()

export default function SignIn() {
  const navigate = useNavigate()

  React.useEffect(() => {
    localStorage.clear()
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const response = await login({
      username: data.get('username') as string,
      password: data.get('password') as string
    })

    console.log(response)

    if (response === null) {
      alert('Failed to login. Try again.')
    } else {
      alert('Successful login')
      localStorage.setItem('token', response.token)
      localStorage.setItem('role', response.role)
      localStorage.setItem('isAuthenticated', 'true')
      navigate('/')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='sm'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='username'
                  label='Користувацьке ім`я'
                  name='username'
                  autoComplete='username'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Пароль'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Увійти
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/forgot-password'>Забуто пароль?</Link>
              </Grid>
              <Grid item>
                <Link to='/sign-up'>Немає облікового запису? Зареєстуватися</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

SignIn.displayName = 'SignIn'

export { SignIn }
