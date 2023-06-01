import { Layers, Mode, GpsFixed } from '@mui/icons-material'

export type TControlPanel = {
  name: string
  tooltip: string
  state: boolean
  disabled?: boolean
  icon: React.ReactNode | null
  children?: []
}
// eslint-disable-next-line no-shadow
export const enum ButtonActionNames {
  ACTIVATE_DRAWING = 'activateDrawing',
  CHANGE_LAYER = 'changeLayer',
  TRACK_LOCATION = 'trackGeolocation'
}
export const controlPanelState: TControlPanel[] = [
  {
    name: ButtonActionNames.CHANGE_LAYER,
    tooltip: 'Змінити тип карти',
    state: false,
    icon: <Layers />
  },
  {
    name: ButtonActionNames.ACTIVATE_DRAWING,
    tooltip: 'Малювати фігури',
    state: false,
    icon: <Mode />
  },
  {
    name: ButtonActionNames.TRACK_LOCATION,
    tooltip: 'Відслідкувати геолокацію',
    state: false,
    icon: <GpsFixed />
  }
]
