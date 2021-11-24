import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './src/navigators/MainNavigator';
import { store } from './src/store'
import { AuthService } from './src/services/Authservice';
const App = () => {
  useEffect(() => {
    new AuthService().removeToken()
  }, [])
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <MainNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;