export type UserLogin = {
  username: string
  password: string
}

export interface LoginResponse {
  emailAddress: string
  givenName: string
  role: 'User' | 'Admin'
  surname: string
  token: string
  username: string
}
