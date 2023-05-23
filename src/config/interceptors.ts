import { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = token ? `Bearer ${token}` : null

  return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`)
  return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`)
  return response
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (error?.response?.status === 401) {
    // Delete Token & Go To Login Page if you required.
    localStorage.removeItem('token')
    window.location.href = 'http://localhost:3000/sign-in'
  }
  console.error(`[response error] [${JSON.stringify(error)}]`)
  return Promise.reject(error)
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}
