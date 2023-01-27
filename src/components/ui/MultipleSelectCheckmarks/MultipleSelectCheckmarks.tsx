import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { FC, useState } from 'react'
import { Typography } from '@mui/material'

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
const options = [
  { label: 'Oliver Hansen', value: 'OH' },
  { label: 'Van Henry', value: 'VH' },
  { label: 'April Tucker', value: 'AT' },
  { label: 'Kelly Snyder', value: 'KS' }
]

interface MultipleSelectCheckmarksProps {
  name: string
  label: string
}

// interface IOption {
//   label: string
//   value: string
// }

const MultipleSelectCheckmarks: FC<MultipleSelectCheckmarksProps> = ({ name, label }) => {
  const [state, setState] = useState<string[]>([])

  const isAllSelected = options.length > 0 && state.length === options.length

  const handleChange = (event: SelectChangeEvent<typeof state>) => {
    const {
      target: { value }
    } = event
    console.log(value)

    if (value[value.length - 1] === 'all') {
      setState(state.length === options.length ? [] : options.map(item => item.value))
      return
    }

    setState(value as string[])
  }

  return (
    <FormControl sx={{ width: 300, m: 1 }} size='small'>
      <InputLabel id='demo-multiple-checkbox-label'>{label}</InputLabel>
      <Select
        labelId='demo-multiple-checkbox-label'
        id='demo-multiple-checkbox'
        multiple
        name={name}
        value={state}
        onChange={handleChange}
        input={<OutlinedInput size='small' label='Tag' />}
        renderValue={selected => {
          const labels: string[] = []
          selected.forEach(item => {
            // eslint-disable-next-line fp/no-mutating-methods
            labels.push(options.find(option => option.value === item)?.label || '')
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
          <MenuItem key={index} value={option.value}>
            <Checkbox checked={state.findIndex(item => item === option.value) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

MultipleSelectCheckmarks.displayName = 'MultipleSelectCheckmarks'

export { MultipleSelectCheckmarks }
