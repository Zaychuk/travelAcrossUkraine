import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { FC, useState } from 'react'

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
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
]

interface MultipleSelectCheckmarksProps {
  name: string
  label: string
}

const MultipleSelectCheckmarks: FC<MultipleSelectCheckmarksProps> = ({ name, label }) => {
  const [personName, setPersonName] = useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  return (
    <FormControl sx={{ width: 300, m: 1 }} size='small'>
      <InputLabel id='demo-multiple-checkbox-label'>{label}</InputLabel>
      <Select
        labelId='demo-multiple-checkbox-label'
        id='demo-multiple-checkbox'
        multiple
        name={name}
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput size='small' label='Tag' />}
        renderValue={selected => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {options.map(option => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={personName.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

MultipleSelectCheckmarks.displayName = 'MultipleSelectCheckmarks'

export { MultipleSelectCheckmarks }
