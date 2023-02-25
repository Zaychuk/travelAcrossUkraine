import { ErrorMessage } from '@hookform/error-message'
import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import type { FieldErrorsImpl } from 'react-hook-form'

export interface ErrorControlProps {
  name: string
  errors?: FieldErrorsImpl
}

const ErrorControl: FC<ErrorControlProps> = ({ errors, name }) => {
  return (
    <Box sx={{ minHeight: '14px' }}>
      <ErrorMessage errors={errors} name={name} render={({ message }) => <Typography>{message}</Typography>} />
    </Box>
  )
}

ErrorControl.displayName = 'ErrorControl'

export { ErrorControl }
