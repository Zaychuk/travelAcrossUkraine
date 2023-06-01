import { FC, Fragment, useEffect, useState } from 'react'
import { z } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { NavButton } from 'components/ui'
import { getAllTypesWithCategories } from 'api/typesApi'
import { getAllLocationsByFilter } from 'api/locationApi'
import { Location } from 'types/Location'

const FormSchema = z.object({
  term: z.string().optional(),
  categoryId: z.string().optional()
})

type FormSchemaType = z.infer<typeof FormSchema>
interface MapFilterProps {
  onApplyFilters: (locations: Location[]) => void
}
const MapFilter: FC<MapFilterProps> = ({ onApplyFilters }) => {
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      term: '',
      categoryId: ''
    }
  })

  const [radioValue, setRadioValue] = useState('value1')
  const [categoryOptions, setCategoryOptions] = useState<{ id: string; name: string }[] | []>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [placeOfInterestCategories, setPlaceOfInterestCategories] = useState<{ id: string; name: string }[] | []>([])
  const [ecologicalProblemCategories, setEcologicalProblemCategories] = useState<{ id: string; name: string }[] | []>(
    []
  )

  const [open, setOpen] = useState(false)

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value)
  }
  const handleSelectChange = (event: SelectChangeEvent) => {
    event.preventDefault()
    event.stopPropagation()
    methods.setValue('categoryId', event.target.value)
    setSelectedCategory(event.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const onSubmit: SubmitHandler<FormSchemaType> = async data => {
    console.log(data)
    onApplyFilters(await getAllLocationsByFilter(data))
    methods.reset()
    handleClose()
  }

  useEffect(() => {
    getAllTypesWithCategories()
      .then(data => {
        setPlaceOfInterestCategories(data[0].categories)
        setEcologicalProblemCategories(data[1].categories)
        return data
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (ecologicalProblemCategories.length > 0 && placeOfInterestCategories.length > 0) {
      const arr1: { id: string; name: string }[] = placeOfInterestCategories
      const arr2: { id: string; name: string }[] = ecologicalProblemCategories
      setCategoryOptions(radioValue === 'value1' ? arr1 : arr2)
      setSelectedCategory(radioValue === 'value1' ? arr1[0].id : arr2[0].id)
      methods.setValue('categoryId', radioValue === 'value1' ? arr1[0].id : arr2[0].id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ecologicalProblemCategories, placeOfInterestCategories, radioValue])

  return (
    <Fragment>
      <Box>
        <NavButton tooltipTitle='Фільтр' tooltipPlacement='right-start' onClick={handleClickOpen}>
          <FilterAltIcon />
        </NavButton>
      </Box>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <FormProvider {...methods}>
          <Box component='form' onSubmit={methods.handleSubmit(onSubmit)}>
            <DialogTitle fontSize='28px' fontWeight='600' sx={{ textAlign: 'center', paddingBottom: '0px' }}>
              Фільтр
            </DialogTitle>
            <DialogContent>
              <Grid container sx={{ width: '400px', gap: '15px', paddingTop: '10px' }}>
                <Grid item xs={12}>
                  <FormControl>
                    {/* <FormLabel id='controlled-radio-buttons-group'>Тип локації</FormLabel> */}
                    <RadioGroup
                      row
                      aria-labelledby='controlled-radio-buttons-group'
                      name='controlled-radio-buttons-group'
                      value={radioValue}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel value='value1' control={<Radio />} label='Туристичне місце' />
                      <FormControlLabel value='value2' control={<Radio />} label='Екологічна проблема' />
                    </RadioGroup>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id='simple-select-label'>Категорія</InputLabel>
                    <Select
                      labelId='simple-select-label'
                      id='simple-select'
                      value={selectedCategory}
                      label='Категорія'
                      onChange={handleSelectChange}
                    >
                      {categoryOptions.map((option, index) => (
                        <MenuItem key={index} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth {...methods.register('term')} id='str' label='Ключове слово' />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button type='button' onClick={handleClose}>
                Закрити
              </Button>
              <Button type='submit' variant='contained'>
                Застосувати
              </Button>
            </DialogActions>
          </Box>
        </FormProvider>
      </Dialog>
    </Fragment>
  )
}

MapFilter.displayName = 'MapFilter'

export { MapFilter }
