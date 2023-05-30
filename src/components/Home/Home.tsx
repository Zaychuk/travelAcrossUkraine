import { Box } from '@mui/material'
import Bg from 'assets/bg.jpg'

import * as S from './style'

export default function Home() {
  return (
    <S.Wrapper>
      <S.Bg src={Bg} alt='Bg' />
      <S.Title>Подорожі Україною</S.Title>
      <Box position='absolute' display='flex' justifyContent='center' sx={{ top: '50%', width: '100%' }}>
        <S.Description>
          Quisque mauris leo, commodo non porttitor eget, eleifend sed velit. Proin vehicula, metus consequat molestie
          convallis, metus dui scelerisque lectus, sed convallis nisl erat quis massa. Vestibulum at felis purus.
          Vestibulum auctor faucibus augue, quis feugiat ipsum blandit ac. Morbi condimentum nulla eu eros lacinia
          finibus. Pellentesque interdum felis magna, lobortis condimentum massa auctor et. Aenean erat urna, rutrum et
        </S.Description>
      </Box>
    </S.Wrapper>
  )
}

Home.displayName = 'Home'

export { Home }
