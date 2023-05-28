import axios from 'axios'
import { getBaseUrl } from 'utils/utility'

export interface IUser {
  id: string
  givenName: string
  surname: string
  username: string
  emailAddress: string
  role: string
}

export async function getAllUsers(): Promise<IUser[]> {
  const data = await axios.get(`${getBaseUrl()}/Users`)
  return data.data as IUser[]
}

export async function deleteUser(id: string) {
  await axios.delete(`${getBaseUrl()}/Users/${id}`)
}
