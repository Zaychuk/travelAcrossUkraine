import * as React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
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
import { signUp } from 'api/authApi'
import { CreateUser } from 'types/CreateUser'
// import { Input } from 'components/ui'

const theme = createTheme()

const FormSchema = z.object({
  givenName: z.any(),
  surname: z.string(),
  username: z.string(),
  emailAddress: z.string().email(),
  password: z.string().min(4)
})

type FormSchemaType = z.infer<typeof FormSchema>

function SignUp() {
  const navigate = useNavigate()

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      givenName: '',
      surname: '',
      username: '',
      emailAddress: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FormSchemaType> = async data => {
    const isSuccessul = await signUp(data as CreateUser)
    if (isSuccessul) {
      alert('Registration is successful.\r\nReenter you credentials to login.')
      methods.reset()
      navigate('/sign-in')
    } else {
      alert('Some of the parameters are invalid.')
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
            Sign up
          </Typography>
          <FormProvider {...methods}>
            <Box component='form' onSubmit={methods.handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete='given-name'
                    {...methods.register('givenName')}
                    required
                    fullWidth
                    id='givenName'
                    label='Ім`я'
                    autoFocus
                  />
                  {/* <Input
                    label='First Name'
                    autoFocus
                    control={methods.control}
                    name='givenName'
                  /> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id='surname'
                    label='Прізвище'
                    {...methods.register('surname')}
                    autoComplete='family-name'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='username'
                    label='Користувацьке ім`я'
                    {...methods.register('username')}
                    autoComplete='family-name'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='emailAddress'
                    label='Електронна адреса'
                    {...methods.register('emailAddress')}
                    autoComplete='emailAddress'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    {...methods.register('password')}
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                  />
                </Grid>
              </Grid>
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Зараєструватися
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link to='/sign-in'>Є обліковий запис? Увійти</Link>
                </Grid>
              </Grid>
            </Box>
          </FormProvider>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

SignUp.displayName = 'SignUp'

export { SignUp }
