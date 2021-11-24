import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen, ProfileEditorScreen, SignUpScreen } from '../screens'
import TabNavigator from './TabNavigator';
import { AuthService } from '../services/Authservice';
import { authSlice } from '../store/reducers/auth';
import { getUser } from '../store/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

const Stack = createNativeStackNavigator();
const Auth = new AuthService()

const MainBNavigator = () => {
  const dispatch = useDispatch()
  const { token, user } = useSelector((state:RootState) => state.auth)
  useEffect(() => {
    const bootstrapAsync = async () => {
      let token
      try {
        token = await Auth.getToken()
      }
      catch (e) {
        console.log(e)
      }
      if (token) {
        dispatch(authSlice.actions.setToken({ token }))
        dispatch(getUser())
      }
    }
    bootstrapAsync()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        {
          token === null ?
          (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          )
          :
          (
            <>
              <Stack.Screen name="Home" component={TabNavigator} />
              <Stack.Screen name="ProfileEditor" component={ProfileEditorScreen} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainBNavigator;