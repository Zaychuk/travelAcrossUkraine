/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable dot-notation */
/* eslint-disable max-lines-per-function */
import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { z } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { getAllTypesWithCategories } from 'api/typesApi'

import * as S from './style'

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Поле обов`язкове' }),
  description: z.string().min(1, { message: 'Поле обов`язкове' }),
  ImageUrls: z.string().array().min(1, { message: 'Додайте картинки' }),
  wikipediaUrl: z.string().url({ message: 'Некоректне посилання' }).optional().or(z.literal('')),
  petitionUrl: z.string().url({ message: 'Некоректне посилання' }).optional().or(z.literal('')),
  categoryId: z.any()
})

interface ModalWindowProps {
  onClose: (data: LocationModalDataType | null) => void
}

export type LocationModalDataType = z.infer<typeof FormSchema>

export const ModalWindow: FC<ModalWindowProps> = ({ onClose }) => {
  const [imgList, setImgList] = useState<{ url: string; id: string }[]>([])

  const [radioValue, setRadioValue] = useState('value1')
  const [isLoading, setIsLoading] = useState(false)
  const [categoryOptions, setCategoryOptions] = useState<{ id: string; name: string }[] | []>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [placeOfInterestCategories, setPlaceOfInterestCategories] = useState<{ id: string; name: string }[] | []>([])
  const [ecologicalProblemCategories, setEcologicalProblemCategories] = useState<{ id: string; name: string }[] | []>(
    []
  )

  const methods = useForm<LocationModalDataType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
      ImageUrls: [],
      wikipediaUrl: '',
      petitionUrl: ''
    }
  })

  const onSubmit: SubmitHandler<LocationModalDataType> = data => {
    methods.reset()
    setImgList([])
    onClose(data)
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value)
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    event.preventDefault()
    event.stopPropagation()
    methods.setValue('categoryId', event.target.value)
    setSelectedCategory(event.target.value)
  }

  const handleImgDelete = (imgId: string) => {
    setImgList([...imgList.filter(img => img.id !== imgId)])

    methods.setValue('ImageUrls', [...imgList.filter(img => img.id !== imgId).map(item => item.url)])
  }

  const handleImgChange = (e: any) => {
    setIsLoading(true)
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', process.env.REACT_APP_PRESET_KEY as string)
    formData.append('cloud_name', process.env.REACT_APP_CLOUD_NAME as string)

    axios
      .post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`, formData)
      .then(result => {
        const url: string = result.data.secure_url
        const id: string = result.data.public_id
        setImgList([...imgList, { url, id }])

        methods.setValue('ImageUrls', [...imgList.map(item => item.url), url])
        methods.setError('ImageUrls', { message: undefined })
        setIsLoading(false)
        return true
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err)
      })
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
    <S.ModalWrapper
      onClick={() => {
        onClose(null)
      }}
    >
      <S.Modal
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <S.Title>Нова локація</S.Title>
        <FormProvider {...methods}>
          <Box component='form' onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container sx={{ margin: '0', width: '400px', gap: '15px' }}>
              <Grid item xs={12}>
                <TextField
                  error={!!methods.formState.errors?.name?.message}
                  fullWidth
                  {...methods.register('name')}
                  id='name'
                  label='Назва локації'
                />
                <S.ErrorMessage>{methods.formState.errors?.name?.message || null}</S.ErrorMessage>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id='controlled-radio-buttons-group'>Тип локації</FormLabel>
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
                <TextField
                  error={!!methods.formState.errors?.description?.message}
                  fullWidth
                  multiline
                  rows={4}
                  {...methods.register('description')}
                  id='description'
                  label='Опис'
                />
                <S.ErrorMessage>{methods.formState.errors?.description?.message || null}</S.ErrorMessage>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  {...methods.register('wikipediaUrl')}
                  id='wikipediaUrl'
                  label='Посилання на Вікіпедію'
                />
                <S.ErrorMessage>{methods.formState.errors?.wikipediaUrl?.message || null}</S.ErrorMessage>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  {...methods.register('petitionUrl')}
                  id='petitionUrl'
                  label='Посилання на Петицію'
                />
                <S.ErrorMessage>{methods.formState.errors?.petitionUrl?.message || null}</S.ErrorMessage>
              </Grid>
              <S.ImagesContainer item xs={12}>
                <S.Images item container>
                  {imgList.map((img, index) => (
                    <S.ImgWrapper
                      key={index}
                      onClick={() => {
                        handleImgDelete(img.id)
                      }}
                    >
                      <S.Img src={img.url} alt='Img' loading='lazy' />
                    </S.ImgWrapper>
                  ))}
                  {isLoading ? (
                    <S.LoadWrapper>
                      <CircularProgress />
                    </S.LoadWrapper>
                  ) : null}
                  <Box>
                    <S.Label onChange={handleImgChange} htmlFor='image'>
                      <input type='file' name='image' id='image' hidden />+
                    </S.Label>
                  </Box>
                </S.Images>
                <S.ErrorMessage>{methods.formState.errors?.ImageUrls?.message || null}</S.ErrorMessage>
              </S.ImagesContainer>
              <Grid item container xs={12} sx={{ justifyContent: 'space-between' }}>
                <Button
                  onClick={() => {
                    onClose(null)
                  }}
                  variant='outlined'
                >
                  Закрити
                </Button>
                <Button type='submit' variant='contained'>
                  Застосувати
                </Button>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </S.Modal>
    </S.ModalWrapper>
  )
}
ModalWindow.displayName = 'ModalWindow'
