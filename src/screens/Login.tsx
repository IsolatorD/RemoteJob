import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { COLORS, FONTS, SIZES } from '../constants';
import { LoginSchema } from '../constants/validations';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { login } from '../store/actions/auth';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    error,
    loading
  } = useSelector((state:RootState) => state.auth);

  const onSubmitLogin = async (values:any) => {
    const body = {
      ...values,
      identifier: values.email,
    }
    const { payload } = await dispatch(login(body));
    console.log('Payload', payload);
    if (payload?.jwt) {
      navigation.navigate('Home');
    }
    if (payload?.message === 'Forbidden') {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  }
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
    >
      <View
        style={styles.header}
      >
        <Text
          style={styles.headerText}
        >
          Remote Job
        </Text>
      </View>
      <View
        style={styles.body}
      >
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => onSubmitLogin(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <View
                style={styles.inputContainer}
              >
                <Input
                  label="Email"
                  leftIcon={{ type: 'ionicons', name: 'mail' }}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  autoCompleteType="email"
                  errorMessage={errors.email && touched.email ? errors.email : ''}
                  editable={!loading}
                />
              </View>
              <View
                style={styles.inputContainer}
              >
                <Input
                  label="Contraseña"
                  leftIcon={{ type: 'ionicons', name: 'lock' }}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={true}
                  value={values.password}
                  autoCompleteType="password"
                  errorMessage={errors.password && touched.password ? errors.password : ''}
                  editable={!loading}
                />
              </View>
              <View
                style={styles.buttonContainer}
              >
                <Button
                  title="Iniciar Sesión"
                  onPress={handleSubmit}
                  loading={loading}
                />
              </View>
              <View
                style={{
                  marginTop: SIZES.margin
                }}
              >
                <Button
                  title="¿No posees una cuenta? Registrate"
                  type="clear"
                  disabled={loading}
                  onPress={() => navigation.navigate('SignUp')}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  header: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    ...FONTS.h1,
    fontWeight: 'bold',
    color: COLORS.black
  },
  body: {
    flex: 2,
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.padding
  },
  inputContainer: {
    marginBottom: SIZES.base
  },
  buttonContainer: {
    marginTop: SIZES.margin * 2
  }
});

export default Login;