import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Correo electronico invalido').required('Correo electronico requerido'),
  password: Yup.string().required('Contraseña requerida'),
});

export const SignUpSchema = Yup.object().shape({
  first_name: Yup.string().required('Nombre requerido'),
  last_name: Yup.string().required('Apellido requerido'),
  email: Yup.string().email('Correo electronico invalido').required('Correo electronico requerido'),
  password: Yup.string().required('Contraseña requerida'),
});

export const updateProfileSchema = Yup.object().shape({
  first_name: Yup.string().required('Nombre requerido'),
  last_name: Yup.string().required('Apellido requerido'),
  email: Yup.string().email('Correo electronico invalido').required('Correo electronico requerido'),
  bio: Yup.string(),
});