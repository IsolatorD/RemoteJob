import axios, { AxiosResponse } from 'axios'
import { AuthService } from './Authservice'

export const baseURL = 'https://16f0-186-167-245-135.ngrok.io'
// create axios library
const http = axios.create({
  baseURL,
  timeout: 10000,
})

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

const formDataHeaders = {
  'Content-Type': 'multipart/form-data',
  'Access-Control-Allow-Origin': '*'
}

const Auth = new AuthService()
http.interceptors.request.use(async (config:any) => {
  const token = await Auth.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// create class for axios http with type validation and dynamic typing
export default class HttpService {
  constructor () {
  }

  get(url: string): Promise<AxiosResponse> {
    return http.get(url, {
      headers: jsonHeaders
    })
  }

  post(url: string, data: any): Promise<AxiosResponse> {
    return http.post(url, data, {
      headers: jsonHeaders
    })
  }

  put(url: string, data: any): Promise<AxiosResponse> {
    return http.put(url, data, {
      headers: jsonHeaders
    })
  }

  delete(url: string): Promise<AxiosResponse> {
    return http.delete(url, {
      headers: jsonHeaders
    })
  }
}