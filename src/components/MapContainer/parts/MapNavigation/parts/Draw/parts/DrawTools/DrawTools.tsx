import React, { FC } from 'react'
import { Grid, useMediaQuery } from '@mui/material'
import { Clear, Save, FindInPage } from '@mui/icons-material'
import { NavButton } from 'components/ui'
import { GeometryFigure } from 'types/GeometryFigure'

import { drawTools } from './helper'
import { sx } from './style'

interface SelectDrawToolProps {
  isOpen?: boolean
  isShowControl: boolean
  typeDraw: GeometryFigure | null
  onSave: () => void
  onFind: () => void
  onDelete: () => void
  onSelectDrawToolType: (type: GeometryFigure) => void
}

const DrawTools: FC<SelectDrawToolProps> = props => {
  const { isShowControl, typeDraw, onSave, onDelete, onFind, onSelectDrawToolType } = props
  const matches = useMediaQuery('(max-width:375px)')
  console.log(typeDraw, 'afasfsafa')
  return (
    <Grid container sx={matches ? { ...sx.container, width: '200px' } : sx.container}>
      <Grid container item sx={sx.item}>
        {drawTools.map(tool => (
          <NavButton
            key={tool.name}
            isActive={typeDraw === tool.type}
            onClick={() => onSelectDrawToolType(tool.type)}
            tooltipTitle={tool.name}
            tooltipPlacement='bottom'
          >
            {tool.icon}
          </NavButton>
        ))}
        {isShowControl && (
          <React.Fragment>
            <NavButton onClick={onSave} tooltipTitle='Зберегти фігуру' tooltipPlacement='bottom'>
              <Save />
            </NavButton>
            {typeDraw === 'Polygon' &&
              (
              <NavButton onClick={onFind} tooltipTitle='Знайти' tooltipPlacement='bottom'>
                <FindInPage />
              </NavButton>)}
            <NavButton onClick={onDelete} tooltipTitle='Очистити фігуру' tooltipPlacement='bottom'>
              <Clear />
            </NavButton>
          </React.Fragment>
        )}
      </Grid>
    </Grid>
  )
}

DrawTools.displayName = 'DrawTools'
export { DrawTools }
