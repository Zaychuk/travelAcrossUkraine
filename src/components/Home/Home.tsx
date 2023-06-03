import { Box } from '@mui/material'
import Bg from 'assets/bg.jpg'

import * as S from './style'

export default function Home() {
  return (
    <S.Wrapper>
      <S.Bg src={Bg} alt='Bg' />
      <S.Title>Подорожі Україною</S.Title>
      <Box position='absolute' display='flex' justifyContent='center' sx={{ top: '30%', width: '100%' }}>
        <S.Description>
          &emsp;Подорожі завжди приносять дуже хороші емоції, враження та є довгоочікуваними та бажаними для кожного.
          Проте екологічний стан довкілля може мати неабиякий вплив на якість та досвід подорожі.
          <br />
          <br />
          &emsp;Перш за все ключовим чинником, що відбиває бажання поїхати в певне місце є забруднення повітря, води чи землі, що може призвести до проблем зі здоров’ям і вплинути чи завдати шкоди природним пам’яткам і ландшафтам, зменшуючи їх красу та екологічну цінність.
          <br />
          <br />
          &emsp;Мандрівникам дуже важливо враховувати екологічний стан довкілля та робити відповідальний вибір при плануванні безпечної подорожі.
          <br />
          <br />
          &emsp;Саме тому була створена веб-платформа "екоМандри", щоб зробити ваші поїздки безпечнішими!
        </S.Description>
      </Box>
    </S.Wrapper>
  )
}

Home.displayName = 'Home'

export { Home }