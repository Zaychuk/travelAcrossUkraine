import { getBaseUrl } from 'utils/utility'
import { LoginResponse, UserLogin } from 'types/UserLogin'
import { CreateUser } from 'types/CreateUser'

export async function login(param: UserLogin): Promise<LoginResponse | null> {
  const data = await fetch(`${getBaseUrl()}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify(param),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  if (data.status >= 400) {
    return null
  }

  const result = await data.json()

  return result
}

export async function signUp(param: CreateUser): Promise<boolean> {
  const data = await fetch(`${getBaseUrl()}/api/auth/signUp`, {
    method: 'POST',
    body: JSON.stringify(param),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  if (data.status >= 400) {
    return false
  }

  return true
}
