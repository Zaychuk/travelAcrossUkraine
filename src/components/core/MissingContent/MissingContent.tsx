import React, { useCallback } from 'react'
import Button from '@mui/material/Button/Button'
import { useNavigate } from 'react-router'

import * as S from './styles'

const MissingContent = () => {
  const navigate = useNavigate()
  const handleOnClick = useCallback(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (isAuthenticated) {
    navigate('./')
    } else {
      navigate('sign-in')
    }
  }, [navigate])
  return (
    <S.Wrapper>
      <S.Text>
        От халепа 😅. Здається ви натрапили на ще не існуючу сторінку нашого веб-застосунку
      </S.Text>
      <S.Text>
        Будь ласка, загляньте сюди пізніше 🖐
      </S.Text>
      <S.Text className='emoji'>
        😉
      </S.Text>
      <Button onClick={handleOnClick} variant='contained' sx={{ mt: 3, mb: 2 }}> На головну</Button>
    </S.Wrapper>
  )
}

MissingContent.displayName = 'MissingContent'
export default MissingContent
