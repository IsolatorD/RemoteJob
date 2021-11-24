import { Formik } from 'formik';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { Avatar, Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, FONTS, images, SIZES } from '../constants';
import { updateProfileSchema } from '../constants/validations';
import { baseURL } from '../services/httpService';
import { RootState } from '../store';
import { getUser, updateProfile } from '../store/actions/auth';

const ProfileEditor = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    user,
    loading
  } = useSelector((state: RootState) => state.auth);

  const onSubmitProfile = async (values:any) => {
    const data = {
      id: user?.id,
      body: values
    }
    const { payload } = await dispatch(updateProfile(data));
    console.log('Payload', payload);
    if (payload) {
      Alert.alert('Success', 'Perfil actualizado');
      await dispatch(getUser());
    }
  };


  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="arrow-left"
            size={25}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          Editar Perfil
        </Text>
      </View>
      <View style={styles.body}>
        <View
          style={styles.avatarSection}
        >
          <Avatar
            size={80}
            rounded
            source={user?.profile_photo ?
              {uri: `${baseURL}${user?.profile_photo?.url}`}
              : images.profile
            }
          />
        </View>
        <View
          style={styles.form}
        >
          <Formik
            initialValues={{
              first_name: user?.first_name || '',
              last_name: user?.last_name || '',
              email: user?.email || '',
              bio: user?.bio || '',
            }}
            validationSchema={updateProfileSchema}
            onSubmit={values => onSubmitProfile(values)}
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
                  // style={styles.inputContainer}
                >
                  <Input
                    label="Biografia"
                    leftIcon={{ type: 'ionicons', name: 'person' }}
                    onChangeText={handleChange('bio')}
                    onBlur={handleBlur('bio')}
                    value={values.bio}
                    autoCompleteType="bio"
                    editable={!loading}
                    numberOfLines={4}
                    multiline
                  />
                </View>
                <View
                  style={styles.buttonContainer}
                >
                  <Button
                    title="Guardar"
                    onPress={handleSubmit}
                    loading={loading}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding
  },
  headerText: {
    textAlign: 'center',
    ...FONTS.h3,
    fontWeight: 'bold',
    color: COLORS.black,
    marginLeft: 20,
  },
  body: {
    flex: 2.5,
    paddingTop: SIZES.padding
  },
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    marginTop: SIZES.margin
  },
  inputContainer: {
    marginBottom: SIZES.margin / 2
  },
  buttonContainer: {
    marginTop: SIZES.margin * 2
  }
});

export default ProfileEditor;