
import FormikTextInput from './FormikTextInput';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import Button from './Button';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const initialValues = {
  username: '',
  password: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
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

const SignInFrom = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.textInput} name="username" placeholder="Username" />
      <View style={styles.spacing} />
      <FormikTextInput style={styles.textInput} secureTextEntry name="password" placeholder="Password" />
      <View style={styles.spacing} />

      <Button onPress={onSubmit} label='Sign In' />
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate()
  // const authenticate = new AuthStorage()

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log(values, username, password)

    try {
      const { data } = await signIn({ username, password });
      navigate('/')
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInFrom onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;