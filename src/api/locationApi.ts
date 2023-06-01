/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { getBaseUrl } from 'utils/utility'

import { Location } from '../types/Location'

export async function getAllLocations(): Promise<Location[]> {
  const data = await axios.get(`${getBaseUrl()}/Locations`)
  return data.data as Location[]
}

export async function getAllLocationsInGivenArea(params: any): Promise<Location[]> {
  const data = await axios.post(`${getBaseUrl()}/Locations/inGivenArea`, params.polygon)
  return data.data as Location[]
}

export async function getAllLocationsByFilter(params: any): Promise<Location[]> {
  const data = await axios.post(`${getBaseUrl()}/Locations/byFilter`, params)
  return data.data as Location[]
}

export async function getLocationById(locationId: string): Promise<Location> {
  const data = await axios.get(`${getBaseUrl()}/Locations/${locationId}`)
  return data.data as Location
}

export async function createLocation(params: any): Promise<string> {
  const data = await axios.post(`${getBaseUrl()}/Locations`, params)
  return data.data as string
}

export async function getPendingLocations(): Promise<Location[]> {
  const data = await axios.get(`${getBaseUrl()}/Locations/pending`)
  return data.data as Location[]
}

export async function approveLocation(id: string): Promise<string> {
  const data = await axios.put(`${getBaseUrl()}/Locations/${id}/approve`)
  return data.data as string
}

export async function declineLocation(id: string): Promise<string> {
  const data = await axios.put(`${getBaseUrl()}/Locations/${id}/decline`)
  return data.data as string
}

export async function addToCollection(locationId: string, collectionId: string): Promise<string> {
  const data = await axios.get(`${getBaseUrl()}/Collections/addlocation`, {
    params: {
      locationId,
      collectionId
    }
})
  return data.data as string
}
