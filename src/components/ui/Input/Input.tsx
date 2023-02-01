import { FC } from 'react'
import { Box, TextField } from '@mui/material'
import { Control, useController } from 'react-hook-form'

import { ErrorControl } from '../ErrorControl/ErrorControl'

interface InputProps {
  name: string
  label: string
  type?: string
  fullWidth?: boolean
  autoFocus?: boolean
  autoComplete?: string
  control: Control
}

const Input: FC<InputProps> = ({ name, label, fullWidth, autoFocus, autoComplete, control }) => {
  const {
    field,
    formState: { errors }
  } = useController({
    name,
    control
  })

  return (
    <Box>
      <TextField
        // error
        {...field}
        autoComplete={autoComplete}
        fullWidth={fullWidth}
        id={name}
        label={label}
        autoFocus={autoFocus}
        helperText='Incorrect entry.'
      />
      <ErrorControl errors={errors} name={name} />
    </Box>
  )
}

Input.displayName = 'Input'

export { Input }
