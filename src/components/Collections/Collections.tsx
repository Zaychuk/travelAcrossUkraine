/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, MouseEvent, useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, Box, Button, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Wiki from 'assets/svg/wikipedia-svgrepo-com.svg'
import Petition from 'assets/svg/book-open-svgrepo-com.svg'
import ReactPortal from 'components/core/ReactPortal/ReactPortal'
import { ConfirmModal } from 'components/ui'
import { ICollectionWithLocations, createCollection, deleteCollection, editCollection, getAllCollection } from 'api/collectionsApi'

import { ModalWindow } from './parts'
import * as S from './style'
export default function Collections() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
  const [editableCollection, setEditableCollection] = useState<{ id?: string; name?: string }>()
  const [collections, setCollections] = useState<ICollectionWithLocations[]>([])

  useEffect(() => {
    fetchCollections()
  }, [])
  const handleOpenModal = (e: MouseEvent<HTMLButtonElement>, id?: string, name?: string) => {
    e.stopPropagation()
    setShowModal(true)
    if (id) {
      setEditableCollection({ id, name })
    }
  }
  const handleCloseModal = () => {
    setShowModal(false)
    setEditableCollection({})
  }

  const handleCreate = async (name: string) => {
    try {
      await createCollection({ name })
      fetchCollections()
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = async (id: string, name: string) => {
    try {
      await editCollection(id, { name })
      fetchCollections()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteCollection = async () => {
    if (editableCollection?.id) {
      try {
        await deleteCollection(editableCollection.id)
        fetchCollections()
      } catch (err) {
        console.log(err)
      }
    }
  }
  const fetchCollections = () => {
    getAllCollection()
      .then(data => {
        setCollections(data)
        return true
      })
      .catch(err => console.log(err))
  }

  const handleSubmit = (id?: string, name?: string) => {
    if (id && name && name !== editableCollection?.name) {
      handleEdit(id, name)
    }
    if (!id && name) {
      handleCreate(name)
    }
  }

  const handleOpenConfirmModal = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation()
    setShowConfirmModal(true)
    setEditableCollection({ id })
  }
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false)
    setEditableCollection({})
  }

  return (
    <Fragment>
      <ReactPortal wrapperId='modal-root'>
        {showModal && (
          <ModalWindow editableCollection={editableCollection} onClose={handleCloseModal} onSubmit={handleSubmit} />
        )}
      </ReactPortal>
      <ReactPortal wrapperId='modal-root'>
        {showConfirmModal && (
          <ConfirmModal
            title='Увага'
            description='Дійсно хочете видалити категорію?'
            onClose={handleCloseConfirmModal}
            handleSubmit={handleDeleteCollection}
          />
        )}
      </ReactPortal>
      <Box sx={{ padding: '20px' }}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <S.Title>Колекції</S.Title>
          <Button
            variant='contained'
            onClick={e => {
              handleOpenModal(e)
            }}
          >
            Додати
          </Button>
        </Box>
        <Box sx={{ padding: '20px' }}>
          {collections !== null && collections?.length > 0 && collections?.map(collection => (
            <Accordion key={collection.id}>
              <S.Summary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
                <S.CategoryTitle>{collection.name}</S.CategoryTitle>
                <S.Btn
                  onClick={e => {
                    handleOpenModal(e, collection.id, collection.name)
                  }}
                >
                  <EditIcon sx={{ width: '16px', height: '16px', color: '#00AAFF' }} />
                </S.Btn>
                <S.Btn
                  onClick={e => {
                    handleOpenConfirmModal(e, collection.id)
                  }}
                >
                  <DeleteIcon sx={{ width: '16px', height: '16px', color: 'rgb(211, 47, 47)' }} />
                </S.Btn>
              </S.Summary>
              <AccordionDetails>
                {collection.locations?.map(location => (
                  <S.LocationContainer key={location.id}>
                    <S.Wrapper>
                      <S.NameContainer>
                        <S.Name>{location.name}</S.Name>
                        <Box display='flex' gap='5px' sx={{ marginRight: '30px', marginBottom: '7px' }}>
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
                        </Box>
                      </S.NameContainer>
                      <S.ImagesContainer>
                        {location.imageUrls?.map((img, index) => (
                          <S.ImgContainer key={index}>
                            <S.Img src={img} alt='Img' loading='lazy' />
                          </S.ImgContainer>
                        ))}
                      </S.ImagesContainer>
                    </S.Wrapper>

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography fontSize={24} fontWeight={500}>
                        Опис
                      </Typography>
                      <Typography>{location.description}</Typography>
                    </Box>
                  </S.LocationContainer>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Fragment>
  )
}

Collections.displayName = 'Collections'

export { Collections }
