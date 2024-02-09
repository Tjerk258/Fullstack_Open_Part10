
import FormikTextInput from './FormikTextInput';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import Button from './Button';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useSignUp from '../hooks/useSignUp';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
    passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const styles = StyleSheet.create({
  spacing: {
    marginBottom: 10
  },
  container: {
    padding: 10,
    backgroundColor: 'white',
  }
});

export const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.textInput} name="username" placeholder="Username" />
      <View style={styles.spacing} />
      <FormikTextInput style={styles.textInput} secureTextEntry name="password" placeholder="Password" />
      <View style={styles.spacing} />
      <FormikTextInput style={styles.textInput} secureTextEntry name="passwordConfirmation" placeholder="Password confirmation" />
      <View style={styles.spacing} />

      <Button onPress={onSubmit} label='Sign Up' />
    </View>
  )
}

const SignUp = () => {
  const navigate = useNavigate()
  const [signUp] = useSignUp();

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log(values, username, password)

    try {
      signUp({username, password})
      navigate('/')
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;