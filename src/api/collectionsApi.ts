import axios from 'axios'
import { getBaseUrl } from 'utils/utility'

export interface ICollectionWithLocations {
    id: string
    name: string
    locations: {
        name: string;
        id: string;
        imageUrls: string[];
        description: string;
        wikipediaUrl: string;
        petitionUrl: string
    }[]
}

export async function getAllCollection(): Promise<ICollectionWithLocations[]> {
    const data = await axios.get(`${getBaseUrl()}/Collections`)
    return data.data as ICollectionWithLocations[]
}

export async function createCollection(params: { name: string }): Promise<string> {
    const data = await axios.post(`${getBaseUrl()}/Collections`, params)
    return data.data as string
}

export async function deleteCollection(id: string) {
    await axios.delete(`${getBaseUrl()}/Collections/${id}`)
}

export async function editCollection(id: string, params: { name: string }): Promise<string> {
    const data = await axios.put(`${getBaseUrl()}/Collections/${id}`, params)
    return data.data as string
}
