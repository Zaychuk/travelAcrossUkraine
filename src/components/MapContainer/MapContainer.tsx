import { FC, useState, useEffect } from 'react'
import { fromLonLat } from 'ol/proj'
import { RMap, ROSM as ROpenStreetMap, RLayerTile, RLayerVector, RFeature, RControl } from 'rlayers'
import { RView } from 'rlayers/RMap'
import { Grid } from '@mui/material'
import { StylesMapUtil } from 'utils'
import { TFeature } from 'types/GeometryFigure'

import { MapNavigation } from './parts'
import { getAllFeatureFrom, sources as LayerSource, TSourse } from './helper'
import { styles } from './styles'

const MapContainer: FC = () => {
  const initialMapOptions: RView = {
    center: fromLonLat([0, 0]),
    zoom: 5
  }
  const [view, setView] = useState<RView>(initialMapOptions)
  const [sources, setSources] = useState<TSourse[]>(LayerSource)
  const [features, setFeatures] = useState<TFeature[] | null>(null)
  const [isSavedFeature, setIsSavedFeature] = useState<boolean>(false)

  useEffect(() => {
    /* choosing the center of the map by location */
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const newView = {
          center: fromLonLat([position.coords.longitude, position.coords.latitude])
          // zoom: 9
        }
        setView({ ...view, ...newView })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const feat = localStorage.getItem('FeatureCollection')
    if (feat) {
      if (isSavedFeature) {
        setFeatures(JSON.parse(feat))
        setIsSavedFeature(false)
      } else {
        setFeatures(JSON.parse(feat))
      }
    }
  }, [isSavedFeature])
  /* select current map layer */
  const handleSelectLayer = (name: string) => {
    const tempLayers = sources.map(layer =>
      layer.name === name ? { ...layer, visible: true } : { ...layer, visible: false }
    )
    setSources(tempLayers)
  }

  const handleSetSavedFeature = (isSaved: boolean) => {
    setIsSavedFeature(isSaved)
  }
  const handleRemoveAllFeatures = () => {
    setFeatures(null)
    localStorage.removeItem('FeatureCollection')
  }
  return (
    <Grid container sx={styles.mapContainer}>
      <RMap initial={initialMapOptions} view={[view, setView]} {...styles.map}>
        <MapNavigation
          onSelectLayer={handleSelectLayer}
          onSetSavedFeature={handleSetSavedFeature}
          onDeleteAllFeatures={handleRemoveAllFeatures}
        >
          <ROpenStreetMap />
          {sources.map(item => (
            <RLayerTile key={item.name} url={item.url} attributions={item.attributions} visible={item.visible} />
          ))}
          {features && (
            <RLayerVector properties={{ name: 'FeaturesLayer' }}>
              {getAllFeatureFrom(features).map((feature, index) => (
                <RFeature key={index} feature={feature} style={StylesMapUtil.defaultStyleFunction(feature)} />
              ))}
            </RLayerVector>
          )}
          <RControl.RScaleLine />
        </MapNavigation>
      </RMap>
    </Grid>
  )
}
MapContainer.displayName = 'MapContainer'
export { MapContainer }
