/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, MouseEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import Wiki from 'assets/svg/wikipedia-svgrepo-com.svg'
import Petition from 'assets/svg/book-open-svgrepo-com.svg'
import ReactPortal from 'components/core/ReactPortal/ReactPortal'
import { ConfirmModal } from 'components/ui'
import { approveLocation, declineLocation, getPendingLocations } from 'api/locationApi'
import { Location } from 'types/Location'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

import * as S from './style'

export default function Locations() {
  const [locations, setLocations] = useState<Location[]>([])

  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
  const [editableLocation, setEditableLocation] = useState<{ id?: string; name?: string }>()
  const [decision, setDecision] = useState<string>()

  const handleOpenConfirmModal = (e: MouseEvent<HTMLButtonElement>, id: string, str: string) => {
    e.stopPropagation()
    setShowConfirmModal(true)
    setEditableLocation({ id })
    setDecision(str)
  }
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false)
    setEditableLocation({})
    setDecision('')
  }
  const handleStandOut = async () => {
    if (!editableLocation?.id) return

    if (decision === 'approve') {
      console.log('approve', editableLocation?.id)

      try {
        await approveLocation(editableLocation?.id)
        fetchLocations()
      } catch (err) {
        console.log(err)
      }
    }
    if (decision === 'decline') {
      console.log('decline', editableLocation?.id)
      try {
        await declineLocation(editableLocation?.id)
        fetchLocations()
      } catch (err) {
        console.log(err)
      }
    }
  }

  const fetchLocations = () => {
    getPendingLocations()
      .then(data => setLocations(data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchLocations()
  }, [])

  return (
    <Fragment>
      <ReactPortal wrapperId='modal-root'>
        {showConfirmModal && (
          <ConfirmModal
            title='Увага'
            description={
              decision === 'decline' ? 'Дійсно хочете відхилити локацію?' : 'Дійсно хочете підтвердити локацію?'
            }
            onClose={handleCloseConfirmModal}
            handleSubmit={handleStandOut}
          />
        )}
      </ReactPortal>
      <Box sx={{ padding: '20px' }}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <S.Title>Адміністрування локацій</S.Title>
        </Box>
        <Box sx={{ padding: '20px' }}>
          {locations.map(location => (
            <S.LocationContainer key={location.id}>
              <S.Name>{location.name}</S.Name>

              <S.ImagesContainer>
                {location.imageUrls.map((img, index) => (
                  <S.ImgContainer key={index}>
                    <S.Img src={img} alt='Img' loading='lazy' />
                  </S.ImgContainer>
                ))}
              </S.ImagesContainer>
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
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography fontSize={22} fontWeight={500}>
                  Опис:
                </Typography>
                <Typography>{location.description}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography fontSize={22} fontWeight={500}>
                  Посилання на вікіпедію:
                </Typography>
                <Link to={location.wikipediaUrl || ''}>{location.wikipediaUrl || 'URL адреси немає'}</Link>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography fontSize={22} fontWeight={500}>
                  Посилання на петицію:
                </Typography>
                <Link to={location.petitionUrl || ''}>{location.petitionUrl || 'URL адреси немає'}</Link>
              </Box>
              <S.BtnContainer>
                <S.Decline
                  onClick={e => {
                    handleOpenConfirmModal(e, location.id, 'decline')
                  }}
                  variant='contained'
                >
                  <CloseIcon />
                </S.Decline>
                <S.Approve
                  onClick={e => {
                    handleOpenConfirmModal(e, location.id, 'approve')
                  }}
                  variant='contained'
                >
                  <CheckIcon />
                </S.Approve>
              </S.BtnContainer>
            </S.LocationContainer>
          ))}
        </Box>
      </Box>
    </Fragment>
  )
}

Locations.displayName = 'Locations'

export { Locations }
