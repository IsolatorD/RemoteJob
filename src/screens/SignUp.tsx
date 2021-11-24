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
import { SignUpSchema } from '../constants/validations';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { register } from '../store/actions/auth';

const SignUp = ({ navigation }) => {

  const dispatch = useDispatch();
  const {
    error,
    loading,
  } = useSelector((state:RootState) => state.auth);


  const onSubmitRegister = async (values:any) => {
    const body = {
      ...values,
      username: values.email,
    };
    // console.log(values);
    const {payload} = await dispatch(register(body));
    if (payload?.jwt) {
      navigation.navigate('Home');
    }
    console.log('Payload', payload);
    if (payload?.message === 'Bad Request') {
      Alert.alert('Error', 'Este correo ya se encuentra registrado para otro usuario.');
    }
    // await 
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
            first_name: '',
            last_name: '',
            email: '',
            password: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={values => onSubmitRegister(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <View
                style={styles.inputContainer}
              >
                <Input
                  label="Nombre"
                  leftIcon={{ type: 'ionicons', name: 'person' }}
                  onChangeText={handleChange('first_name')}
                  onBlur={handleBlur('first_name')}
                  value={values.first_name}
                  errorMessage={errors.first_name && touched.first_name ? errors.first_name : ''}
                  autoCompleteType="name"
                  editable={!loading}
                />
              </View>
              <View
                style={styles.inputContainer}
              >
                <Input
                  label="Apellido"
                  leftIcon={{ type: 'ionicons', name: 'person' }}
                  onChangeText={handleChange('last_name')}
                  onBlur={handleBlur('last_name')}
                  value={values.last_name}
                  autoCompleteType="string"
                  errorMessage={errors.last_name && touched.last_name ? errors.last_name : ''}
                  editable={!loading}
                />
              </View>
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
                  title="Registrarse"
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
                  title="¿Ya posees una cuenta? Inicia sesión"
                  type="clear"
                  onPress={() => navigation.navigate('Login')}
                  disabled={loading}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    ...FONTS.h1,
    fontWeight: 'bold',
    color: COLORS.black
  },
  body: {
    flex: 3,
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.padding
  },
  inputContainer: {
    marginBottom: SIZES.base
  },
  buttonContainer: {
    marginTop: SIZES.margin
  }
});

export default SignUp;