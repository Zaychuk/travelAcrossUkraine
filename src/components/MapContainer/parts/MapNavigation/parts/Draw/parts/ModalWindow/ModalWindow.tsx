/* eslint-disable max-lines-per-function */
import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { z } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import {
  Box,
  Button,
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
// import { useOnClickOutside } from 'hooks/useOnClickOutside'

import * as S from './style'

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Поле обов`язкове' }),
  description: z.string().min(1, { message: 'Поле обов`язкове' }),
  imageFiles: z.string().array().min(1, { message: 'Додайте картинки' }),
  wikipediaUrl: z.string().url({ message: 'Некоректне посилання' }).optional().or(z.literal('')),
  petitionUrl: z.string().url({ message: 'Некоректне посилання' }).optional().or(z.literal('')),
  categoryId: z.any()
})

interface ModalWindowProps {
  onClose: (data: LocationModalDataType | null) => void
}

export type LocationModalDataType = z.infer<typeof FormSchema>

export const ModalWindow: FC<ModalWindowProps> = ({ onClose }) => {
  // const ref = useRef(null)

  const [imgList, setImgList] = useState<{ url: string; id: string }[]>([])

  const [radioValue, setRadioValue] = useState('value1')
  const [options, setOptions] = useState<{ value: string; name: string }[] | []>([])
  const [selectValue, setSelectValue] = useState('')

  const methods = useForm<LocationModalDataType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
      imageFiles: [],
      wikipediaUrl: '',
      petitionUrl: ''
    }
  })

  // useOnClickOutside(ref, (isClickedoutside: boolean) => {
  //   console.log(isClickedoutside)

  //   if (isClickedoutside) {
  //     onClose(null)
  //   }
  // })

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
    setSelectValue(event.target.value)
  }

  const handleImgDelete = (imgId: string) => {
    const formData = new FormData()
    formData.append('public_id', imgId)
    axios
      .post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/destroy`, formData)
      .then(result => {
        console.log(result)

        return true
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleImgChange = (e: any) => {
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

        methods.setValue('imageFiles', [...imgList.map(item => item.url), url])
        methods.setError('imageFiles', { message: undefined })
        return true
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    const arr1 = [
      { value: '1', name: 'category1.1' },
      { value: '2', name: 'category1.2' }
    ]
    const arr2 = [
      { value: '3', name: 'category2.1' },
      { value: '4', name: 'category2.2' }
    ]
    setOptions(radioValue === 'value1' ? arr1 : arr2)
    setSelectValue(radioValue === 'value1' ? arr1[0].value : arr2[0].value)
    methods.setValue('categoryId', radioValue === 'value1' ? arr1[0].value : arr2[0].value)
  }, [radioValue])

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
        <S.Title>Зберегти фігуру</S.Title>
        <FormProvider {...methods}>
          <Box component='form' onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container sx={{ margin: '0', width: '370px', gap: '15px' }}>
              <Grid item xs={12}>
                <TextField
                  error={!!methods.formState.errors?.name?.message}
                  fullWidth
                  {...methods.register('name')}
                  id='name'
                  label='Ім`я фігури'
                />
                <S.ErrorMessage>{methods.formState.errors?.name?.message || null}</S.ErrorMessage>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id='controlled-radio-buttons-group'>Два варіка</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby='controlled-radio-buttons-group'
                    name='controlled-radio-buttons-group'
                    value={radioValue}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel value='value1' control={<Radio />} label='Value1' />
                    <FormControlLabel value='value2' control={<Radio />} label='Value2' />
                  </RadioGroup>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id='simple-select-label'>Категорія</InputLabel>
                  <Select
                    labelId='simple-select-label'
                    id='simple-select'
                    value={selectValue}
                    label='Категорія'
                    onChange={handleSelectChange}
                  >
                    {options.map((option, index) => (
                      <MenuItem key={index} value={option.value}>
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
                  <Box>
                    <S.Label onChange={handleImgChange} htmlFor='image'>
                      <input type='file' name='image' id='image' hidden />+
                    </S.Label>
                  </Box>
                </S.Images>
                <S.ErrorMessage>{methods.formState.errors?.imageFiles?.message || null}</S.ErrorMessage>
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
