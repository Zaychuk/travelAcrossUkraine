import axios from 'axios'
import { getBaseUrl } from 'utils/utility'

export async function createCategory(params: { name: string; typeId: string }): Promise<string> {
  const data = await axios.post(`${getBaseUrl()}/Categories`, params)
  return data.data as string
}

export async function deleteCategory(id: string) {
  await axios.delete(`${getBaseUrl()}/Categories/${id}`)
}

export async function editCategory(id: string, params: { name: string; typeId: string }): Promise<string> {
  const data = await axios.put(`${getBaseUrl()}/Categories/${id}`, params)
  return data.data as string
}
