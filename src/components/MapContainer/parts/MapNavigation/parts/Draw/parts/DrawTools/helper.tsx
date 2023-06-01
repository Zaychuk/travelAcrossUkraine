import { ReactNode } from 'react'
import { RadioButtonUnchecked, HexagonRounded, FiberManualRecord } from '@mui/icons-material'
import { GeometryFigure } from 'types/GeometryFigure'

type DrawSourse = {
  name: string
  type: GeometryFigure
  icon: ReactNode | undefined
}
export const drawTools: DrawSourse[] = [
  {
    name: 'Полігон',
    type: 'Polygon',
    icon: <HexagonRounded />
  },
  {
    name: 'Геоточка',
    type: 'Point',
    icon: <FiberManualRecord />
  },
  {
    name: 'Коло',
    type: 'Circle',
    icon: <RadioButtonUnchecked />
  }
]
