import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Formik } from 'formik';
import Button from './Button';
import * as yup from 'yup';

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
      <View style={styles.spacing}/>
      <FormikTextInput style={styles.textInput} secureTextEntry name="password" placeholder="Password" />
      <View style={styles.spacing}/>

      <Button onPress={onSubmit} label='Sign In'/>
    </View>
  )
}

const SignIn = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({handleSubmit}) => <SignInFrom onSubmit={handleSubmit}/>}
    </Formik>
  );
};

export default SignIn;