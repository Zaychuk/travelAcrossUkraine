import React, { FC, useState, useEffect } from 'react'
import { fromLonLat } from 'ol/proj'
import { RMap, ROSM as ROpenStreetMap, RLayerTile, RLayerVector, RFeature, RControl } from 'rlayers'
import { RView } from 'rlayers/RMap'
import { Grid } from '@mui/material'
import { StylesMapUtil } from 'utils'
import { TCircle, TFeature } from 'types/GeometryFigure'
import { getAllLocations } from 'api/locationApi'
import { Location } from 'types/Location'
import { Coordinate } from 'ol/coordinate'
import ReactPortal from 'components/core/ReactPortal/ReactPortal'

import { MapNavigation } from './parts'
import { getAllFeatureFrom, sources as LayerSource, TSourse } from './helper'
import { styles } from './styles'
import { ModalWindow } from './parts/ModalWindow/ModalWindow'

const MapContainer: FC = () => {
  const initialMapOptions: RView = {
    center: fromLonLat([33, 49]),
    zoom: 6.2
  }
  const [view, setView] = useState<RView>(initialMapOptions)
  const [sources, setSources] = useState<TSourse[]>(LayerSource)
  const [features, setFeatures] = useState<TFeature[] | null>(null)
  const [locations, setLocations] = useState<Location[] | null>(null)
  const [isSavedFeature, setIsSavedFeature] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [clickedLocationId, setClickedLocationId] = useState<string>('')

  console.log(locations)

  const fetchLocations = () => {
    getAllLocations()
      .then(data => {
        setLocations(data)
        return true
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchLocations()
  }, [])

  useEffect(() => {
    const parsedLocations: TFeature[] = []
    if (locations) {
      locations.forEach(locat => {
        let coord: Coordinate
        let circle: TCircle
        let polygon: Coordinate[][]
        const geometry: TFeature = {
          id: locat.id,
          type: locat.geoPoint !== null ? 'Point'
            : (locat.circle !== null ? 'Circle'
              : 'Polygon'),
          geometries: []
        }
        if (locat.geoPoint !== null) {
          coord = [locat.geoPoint.coordinateX, locat.geoPoint.coordinateY]
          console.log(coord, 'coord')
          geometry.geometries = coord
        } else if (locat.circle !== null) {
          circle = { center: [locat.circle.centerGeoPoint.coordinateX, locat.circle.centerGeoPoint.coordinateY], radius: locat.circle.radius }
          console.log(circle, 'circle')
          geometry.geometries = circle
        } else if (locat.polygon !== null) {
          const sortedPolyginPoints = locat.polygon.geoPoints.sort((first, second) => (first.sequenceNumber > second.sequenceNumber) ? 1 : ((second.sequenceNumber > first.sequenceNumber) ? -1 : 0))
          polygon = [sortedPolyginPoints.map(polPoint => {
            const polCoord: Coordinate = [polPoint.coordinateX, polPoint.coordinateY]
            return polCoord
          })]
          console.log(polygon, 'polygon')
          geometry.geometries = polygon
        }

        parsedLocations.push(geometry)
      })
      setFeatures(parsedLocations)
    }
    console.log(parsedLocations)
  }, [isSavedFeature, locations])
  /* select current map layer */
  const handleSelectLayer = (name: string) => {
    const tempLayers = sources.map(layer =>
      layer.name === name ? { ...layer, visible: true } : { ...layer, visible: false }
    )
    setSources(tempLayers)
  }

  const handleSetSavedFeature = (isSaved: boolean) => {
    setIsSavedFeature(isSaved)
    setTimeout(() => {
      fetchLocations()
    }, 1000)
  }
  const handleRemoveAllFeatures = () => {
    setFeatures(null)
    localStorage.removeItem('FeatureCollection')
  }
  const handleCloseModal = () => {
    console.log('click')
    setShowModal(false)
  }
  // const handleSave = async (modalData: string[] | null) => {
  //   await addToCollections(clickedLocationId, modalData)
  // }
  const setFoundedLocations = (foundedLocations: Location[]) => {
    setLocations(foundedLocations)
  }
  const onApplyFilters = (foundedLocations: Location[]) => {
    setLocations(foundedLocations)
  }
  console.log(features, 'feat')
  return (
    <React.Fragment>
      <ReactPortal wrapperId='modal-root'>{showModal && <ModalWindow locationId={clickedLocationId} onClose={handleCloseModal} />}</ReactPortal>
      <Grid container sx={styles.mapContainer}>
        <RMap initial={initialMapOptions} view={[view, setView]} {...styles.map}>
          <MapNavigation
            onSelectLayer={handleSelectLayer}
            onSetSavedFeature={handleSetSavedFeature}
            onDeleteAllFeatures={handleRemoveAllFeatures}
            setFoundedLocations={setFoundedLocations}
            onApplyFilters={onApplyFilters}
          >
            <ROpenStreetMap />
            {sources.map(item => (
              <RLayerTile key={item.name} url={item.url} attributions={item.attributions} visible={item.visible} />
            ))}
            {features && (
              <RLayerVector properties={{ name: 'FeaturesLayer' }}>
                {getAllFeatureFrom(features).map((feature, index) => (
                  <RFeature key={index} feature={feature} style={StylesMapUtil.defaultStyleFunction(feature, locations?.find(loc => loc.id === features[index]?.id)?.category.type.name)} onClick={(el: any) => { setShowModal(true); setClickedLocationId(el.target.id_) }} />
                ))}
              </RLayerVector>
            )}
            <RControl.RScaleLine />
          </MapNavigation>
        </RMap>
      </Grid>
    </React.Fragment>
  )
}
MapContainer.displayName = 'MapContainer'
export { MapContainer }
