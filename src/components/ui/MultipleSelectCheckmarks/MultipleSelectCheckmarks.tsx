import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { FC, useState } from 'react'
import { Typography } from '@mui/material'
import { Control, useController } from 'react-hook-form'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

interface MultipleSelectCheckmarksProps {
  name: string
  label: string
  control: Control
  options: { id: string; value: string }[] | []
}

const MultipleSelectCheckmarks: FC<MultipleSelectCheckmarksProps> = ({ name, label, control, options }) => {
  const {
    field
    // formState: { errors }
  } = useController({
    name,
    control
  })

  const [state, setState] = useState<string[]>([])

  const isAllSelected = options.length > 0 && state.length === options.length

  const handleChange = (event: SelectChangeEvent<typeof state>) => {
    const {
      target: { value }
    } = event
    console.log(value)

    if (value[value.length - 1] === 'all') {
      setState(state.length === options.length ? [] : options.map(item => item.id))
      field.onChange(state.length === options.length ? [] : options.map(item => item.id))
      return
    }

    setState(value as string[])
    field.onChange(value)
  }

  return (
    <FormControl size='medium'>
      <InputLabel id='demo-multiple-checkbox-label'>{label}</InputLabel>
      <Select
        labelId='multiple-checkbox-label'
        id='multiple-checkbox'
        multiple
        name={field.name}
        value={state}
        onChange={handleChange}
        input={<OutlinedInput size='medium' label='Категорії' />}
        renderValue={selected => {
          const labels: string[] = []
          selected.forEach(item => {
            // eslint-disable-next-line fp/no-mutating-methods
            labels.push(options.find(option => option.id === item)?.value || '')
          })
          return labels.join(', ')
        }}
        MenuProps={MenuProps}
      >
        <MenuItem value='all'>
          <Checkbox checked={isAllSelected} indeterminate={state.length > 0 && state.length < options.length} />
          <ListItemText disableTypography primary={<Typography fontWeight='bold'>Select All</Typography>} />
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.id}>
            <Checkbox checked={state.findIndex(item => item === option.id) > -1} />
            <ListItemText primary={option.value} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

MultipleSelectCheckmarks.displayName = 'MultipleSelectCheckmarks'

export { MultipleSelectCheckmarks }
