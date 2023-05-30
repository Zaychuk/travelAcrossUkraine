import React, { FC, ReactNode, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { NavButton } from 'components/ui'
import { Location } from 'types/Location'

import { Geolocation, SelectLayers, Draw, MapFilter } from './parts'
import { sx } from './style'
import { controlPanelState, TControlPanel, ButtonActionNames } from './helper'

interface MapNavProps {
  children?: ReactNode
  onSelectLayer: (name: string) => void
  onDeleteAllFeatures: () => void
  onSetSavedFeature: (isSaved: boolean) => void
  setFoundedLocations: (locations: Location[]) => void
  onApplyFilters: (locations: Location[]) => void
}

const MapNavigation: FC<MapNavProps> = ({ children, onSelectLayer, onSetSavedFeature, onDeleteAllFeatures, setFoundedLocations, onApplyFilters }) => {
  const [controlTools, setControlTools] = useState<TControlPanel[]>(controlPanelState)

  const updateStatusByName = (name: string) => {
    const newTools = controlTools
      .slice()
      .map(item => (item.name === name ? { ...item, state: !item.state } : { ...item, state: false }))
    setControlTools(newTools)
  }
  const handleToogleState = (e: React.MouseEvent<HTMLButtonElement>) => {
    updateStatusByName(e.currentTarget.name)
  }
  const handleToggleLayers = () => {
    updateStatusByName(ButtonActionNames.CHANGE_LAYER)
  }
  const getButtonStatus = (name: string) => {
    return controlTools.filter((item: TControlPanel) => item.name === name)[0].state
  }
  return (
    <React.Fragment>
      <Box sx={sx.navContainer}>
        <Grid container flexDirection='column' gap='10px'>
          {controlTools.map(button => (
            <NavButton
              key={button.name}
              name={button.name}
              disabled={button.disabled}
              isActive={button.state}
              onClick={handleToogleState}
              tooltipTitle={button.tooltip}
            >
              {button.icon}
            </NavButton>
          ))}
          <NavButton onClick={onDeleteAllFeatures} tooltipTitle='Delete all figure'>
            <Delete />
          </NavButton>
        </Grid>
      </Box>
      <Box sx={sx.filterContainer}>
        <MapFilter onApplyFilters={onApplyFilters} />
      </Box>
      <Grid>
        <Geolocation isActiveMode={getButtonStatus(ButtonActionNames.TRACK_LOCATION)} />
        <Draw
          isOpenedDrawMenu={getButtonStatus(ButtonActionNames.ACTIVATE_DRAWING)}
          setSavedFeature={onSetSavedFeature}
          setFoundedLocations={setFoundedLocations}
        />
        {children}
      </Grid>
      <SelectLayers
        isOpen={getButtonStatus(ButtonActionNames.CHANGE_LAYER)}
        handleToggleLayers={handleToggleLayers}
        selectLayer={onSelectLayer}
      />
    </React.Fragment>
  )
}
MapNavigation.displayName = 'MapNavigation'
export { MapNavigation }
