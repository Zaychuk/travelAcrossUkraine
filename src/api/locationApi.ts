import axios from 'axios'
import { getBaseUrl } from 'utils/utility'

import { Location } from '../types/Location'

export async function getAllLocations(): Promise<Location[]> {
    const data = await axios.get(`${getBaseUrl()}/api/Locations`)
    return data.data as Location[]
}
