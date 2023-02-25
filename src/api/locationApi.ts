import { getBaseUrl } from 'utils/utility'

export function getAllLocations(): Promise<Location[]> {
    return fetch(`${getBaseUrl()}/api/Locations`, { method: 'GET' })
    .then((data) => data.json())
    .then((data) => data as Location[])
}
