/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable dot-notation */
/* eslint-disable max-lines-per-function */
import { FC, Fragment, useEffect, useState } from 'react'
// import Wiki from 'assets/svg/wikipedia-svgrepo-com.svg'
// import Petition from 'assets/svg/book-open-svgrepo-com.svg'
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material'
import { z } from 'zod'
import { Location } from 'types/Location'
import { addToCollection, getLocationById } from 'api/locationApi'
import { Link } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getAllCollection } from 'api/collectionsApi'

import * as S from './style'

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

interface ModalWindowProps {
  onClose: () => void
  locationId: string
}

const FormSchema = z.object({
  collectionId: z.array(z.string())
})

type FormSchemaType = z.infer<typeof FormSchema>

export const ModalWindow: FC<ModalWindowProps> = ({ onClose, locationId }) => {
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      collectionId: []
    }
  })
  const [location, setLocation] = useState<Location>()
  console.log(location)

  // const [selectedCollection, setSelectedCollection] = useState('')
  const [collectionNames, setCollectionNames] = useState<string[]>([])
  const [collectionOptions, setCollectionOptions] = useState<{ id: string; name: string }[]>([])

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault()
    event.stopPropagation()
    const {
      target: { value }
    } = event
    // methods.setValue('collectionId', event.target.value)
    setCollectionNames(typeof value === 'string' ? value.split(',') : value)
  }
  const onSubmit = async (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    console.log(collectionOptions.filter(({ name }) => collectionNames.includes(name)).map(item => item.id))
    await addToCollection(
      locationId,
      collectionOptions.filter(({ name }) => collectionNames.includes(name)).map(item => item.id)
    )
    onClose()
    alert('Колекції успішно оновлено')
  }
  // const onSubmit: SubmitHandler<FormSchemaType> = async data => {
  //   console.log(data)
  //   methods.reset()
  //   await addToCollection(locationId, data.collectionId)
  //   alert('Локація успішно додана до колекції')
  // }

  useEffect(() => {
    getLocationById(locationId)
      .then(data => {
        setLocation(data)
        if (data.collections.length) {
          setCollectionNames(data.collections.map(({ name }) => name))
        }
        return true
      })
      .catch(err => console.log(err))
    getAllCollection()
      .then(data => {
        setCollectionOptions(data)
        return true
      })
      .catch(err => console.log(err))
  }, [locationId])

  // const openAddToCollectionsModal = (e: MouseEvent<HTMLButtonElement>, id: string) => {
  //   e.stopPropagation()
  //   setShowAddToCollectionsModal(true)
  // }

  return (
    <Fragment>
      <S.ModalWrapper
        onClick={() => {
          onClose()
        }}
      >
        <S.Modal
          onClick={e => {
            e.stopPropagation()
          }}
        >
          {/* <S.Title>Локація</S.Title> */}
          {location !== null && location !== undefined ? (
            <S.LocationContainer key={location.id}>
              <Box display='flex' flexDirection='column'>
                <S.Name>{location.name}</S.Name>
                <Chip label={location.category.name} sx={{ margin: '0 auto', width: '100%' }} />
              </Box>
              <S.ImagesContainer>
                {location.imageUrls.map((img, index) => (
                  <S.ImgContainer key={index}>
                    <S.Img src={img} alt='Img' loading='lazy' />
                  </S.ImgContainer>
                ))}
              </S.ImagesContainer>
              {/* <Box display='flex' gap='5px' sx={{ marginRight: '30px', marginBottom: '7px' }}>
                {location.wikipediaUrl ? (
                  <S.Link href={location.wikipediaUrl}>
                    <S.Icon src={Wiki} alt='Wiki' />
                  </S.Link>
                ) : null}
                {location.petitionUrl ? (
                  <S.Link href={location.petitionUrl}>
                    <S.Icon src={Petition} alt='Petition' />
                  </S.Link>
                ) : null}
              </Box> */}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography fontSize={22} fontWeight={500}>
                  Опис:
                </Typography>
                <Typography>{location.description}</Typography>
              </Box>
              {location?.wikipediaUrl ? (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography fontSize={22} fontWeight={500}>
                    Посилання на вікіпедію:
                  </Typography>
                  <Link to={location.wikipediaUrl || ''}>{location.wikipediaUrl || 'URL адреси немає'}</Link>
                </Box>
              ) : null}
              {location.petitionUrl ? (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography fontSize={22} fontWeight={500}>
                    Посилання на петицію:
                  </Typography>
                  <Link to={location.petitionUrl || ''}>{location.petitionUrl || 'URL адреси немає'}</Link>
                </Box>
              ) : null}
              {location.ecologicalProblems.length ? (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography fontSize={22} fontWeight={500}>
                    Екологічні проблеми:
                  </Typography>
                  <Typography fontSize={16} fontWeight={500} color='red'>
                    {location.ecologicalProblems.join(', ')}
                  </Typography>
                </Box>
              ) : null}
              <FormProvider {...methods}>
                <Box component='form'>
                  <Grid container sx={{ width: '400px', gap: '15px', paddingTop: '10px' }}>
                    {/* <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id='simple-select-label'>Колекція</InputLabel>
                        <Select
                          labelId='simple-select-label'
                          id='simple-select'
                          value={selectedCollection}
                          label='Колекція'
                          onChange={handleSelectChange}
                        >
                          {collectionOptions.map((option, index) => (
                            <MenuItem key={index} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid> */}
                    <Grid item xs={12}>
                      <FormControl sx={{ width: '370px' }}>
                        <InputLabel id='demo-multiple-chip-label'>Колекції</InputLabel>
                        <Select
                          labelId='demo-multiple-chip-label'
                          id='demo-multiple-chip'
                          multiple
                          value={collectionNames}
                          onChange={handleSelectChange}
                          input={<OutlinedInput id='select-multiple-chip' label='Колекції' />}
                          renderValue={selected => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map(value => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {collectionOptions.map(({ name }) => (
                            <MenuItem
                              key={name}
                              value={name}
                              style={
                                collectionNames.indexOf(name) === -1
                                  ? { fontWeight: '400' }
                                  : { fontWeight: '500', backgroundColor: '#e5e5e5' }
                              }
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Button type='button' onClick={onClose}>
                      Закрити
                    </Button>
                    <Button type='button' onClick={onSubmit} variant='contained'>
                      Застосувати
                    </Button>
                  </Grid>
                </Box>
              </FormProvider>
            </S.LocationContainer>
          ) : (
            <div>Немає локації</div>
          )}
        </S.Modal>
      </S.ModalWrapper>
    </Fragment>
  )
}
ModalWindow.displayName = 'ModalWindow'
