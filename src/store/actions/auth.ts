
import HttpService from '../../services/httpService'
import { createAsyncThunk } from '@reduxjs/toolkit'

const http = new HttpService()
// const httpFormData = new HttpService({ useFormData: true })

export const register = createAsyncThunk(`auth/register`, async (data:any, thunkAPI) => {
  try {
    const response = await http.post(`/auth/local/register`, data)
    return response.data
  } catch (error: any) {
    console.log('Error in thunk initRegister: ', JSON.stringify(error.response.data))
    return { message: error.response.data.error }
  }
})

export const login = createAsyncThunk(`auth/login`, async (data:any, thunkAPI) => {
  try {
    const response = await http.post(`/auth/local`, data)
    return response.data
  } catch (error:any) {
    console.log('Error in thunk initLogin: ', error.response.data);
    return { message: error.response.data.error  }
  }
})

export const getUser = createAsyncThunk(`auth/getUser`, async () => {
  try {
    const response = await http.get(`/users/me`)
    console.log('User', response.data);
    return response.data
  } catch (error:any) {
    console.log('Error in thunk getUser: ', error.response.data);
    return { message: error.response.data.error }
  }
})
export const updateProfile = createAsyncThunk(`auth/updateProfile`, async (data:any, thunkAPI) => {
  try {
    const { id, body } = data
    const response = await http.put(`/users/${id}`, body)
    return response.data
  } catch (error:any) {
    console.log('Error in thunk updateProfile: ', error.response.data);
    return { message: error.response.data.error }
  }
})