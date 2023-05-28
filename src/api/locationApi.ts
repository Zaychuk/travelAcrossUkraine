import axios from 'axios'
import { getBaseUrl } from 'utils/utility'

import { Location } from '../types/Location'

export async function getAllLocations(): Promise<Location[]> {
  const data = await axios.get(`${getBaseUrl()}/Locations`)
  return data.data as Location[]
}

export async function createLocation(params: any): Promise<string> {
  const data = await axios.post(`${getBaseUrl()}/Locations`, params)
  return data.data as string
}
