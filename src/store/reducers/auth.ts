import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthService } from '../../services/Authservice'
import {
  register,
  login,
  getUser,
  updateProfile,
} from '../actions/auth'

const Auth = new AuthService()

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    token: null,
    loading: false,
    error: {},
  },
  reducers: {
    setToken (state, action) {
      state.token = action.payload.token
    },
    setUser (state, action) {
      state.user = action.payload.user
    },
    logOut: (state) => {
      state.user = {}
      state.token = null
      state.error = {}
      Auth.removeToken()
    },
    removeError: (state) => {
      state.error = {}
    },
  },
  extraReducers: builder => {
    // Init Register
    builder.addCase(register.pending, state => {
      state.loading = true
    })
    builder.addCase(register.fulfilled, (state, action:PayloadAction) => {
      if (action.payload?.jwt) {
        state.user = action.payload?.user
        state.token = action.payload?.jwt
        Auth.setToken(action.payload?.jwt)
      } else {
        state.error.message = action.payload?.message
      }
      state.loading = false
    })
    builder.addCase(register.rejected, state => {
      state.loading = false
    })
    // Init login
    builder.addCase(login.pending, state => {
      state.loading = true
    })
    builder.addCase(login.fulfilled, (state, action: PayloadAction) => {
      if (action.payload?.jwt) {
        state.user = action.payload?.user
        state.token = action.payload?.jwt
        Auth.setToken(action.payload?.jwt)
      } else if (action.payload?.message) {
        state.error.message = action.payload?.message
      }
      state.loading = false
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false
    })
    // get User
    builder.addCase(getUser.pending, state => {
      state.loading = true
    })
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction) => {
      if (action.payload) {
        state.user = action.payload
        Auth.setUser(action.payload)
      } else {
        state.error.message = action.payload?.message
      }
      state.loading = false
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false
    })
    // Update Profile
    builder.addCase(updateProfile.pending, state => {
      state.loading = true
    })
    builder.addCase(updateProfile.fulfilled, (state, action: PayloadAction) => {
      if (action.payload?.success) {
        state.user = action.payload?.user
        Auth.setUser(action.payload?.user)
      } else {
        state.error.message = action.payload?.message
      }
      state.loading = false
    })
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false
    })
  }
})

export default authSlice.reducer