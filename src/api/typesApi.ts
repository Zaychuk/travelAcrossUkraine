import axios from 'axios'
import { getBaseUrl } from 'utils/utility'

export interface ITypeWithCategories {
  id: string
  name: string
  categories: { name: string; id: string }[]
}

export async function getAllTypesWithCategories(): Promise<ITypeWithCategories[]> {
  const data = await axios.get(`${getBaseUrl()}/Types`)
  return data.data as ITypeWithCategories[]
}
