import AsyncStorage from '@react-native-async-storage/async-storage'

// create class for manage auth token and user data
export class AuthService {
  // create token
  private token: string | null = null
  // create user data
  private user: any = null

  // get token
  public getToken = async () => {
    try {
      // get token from storage
      const token = await AsyncStorage.getItem('token')
      // set token
      this.token = token
      // return token
      return token
    } catch (error) {
      // return error
      return error
    }
  }

  // set token
  public setToken = async (token: string) => {
    try {
      // set token to storage
      await AsyncStorage.setItem('token', token)
      // set token
      this.token = token
      // return token
      return token
    } catch (error) {
      // return error
      return error
    }
  }

  public removeToken = async () => {
    try {
      // remove token from storage
      await AsyncStorage.removeItem('token')
      // set token
      this.token = null
      // return token
      return true
    } catch (error) {
      // return error
      return error
    }
  }

  public setUser = async (user: any) => {
    try {
      // set user to storage
      await AsyncStorage.setItem('user', JSON.stringify(user))
      // set user
      this.user = user
      // return user
      return user
    } catch (error) {
      // return error
      return error
    }
  }

  // get user data
  public getUser = async () => {
    try {
      // get user data from storage
      const user = await AsyncStorage.getItem('user')
      // set user data
      this.user = JSON.parse(user)
      // return user data
      return user
    } catch (error) {
      // return error
      return error
    }
  }
}