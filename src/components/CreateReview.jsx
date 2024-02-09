
import FormikTextInput, { FormikNumberInput } from './FormikTextInput';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import Button from './Button';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useNewReview from '../hooks/useNewReview';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Must be greater than or equal to 0')
    .max(100, 'Must be less than or equal to 100')
    .required('rating is required'),
    text: yup
    .string(),
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

export const CreateReviewFrom = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.textInput} name="ownerName" placeholder="Repository owner name" />
      <View style={styles.spacing} />
      <FormikTextInput style={styles.textInput} name="repositoryName" placeholder="Repository name" />
      <View style={styles.spacing} />
      <FormikNumberInput style={styles.textInput} type='number' name="rating" placeholder="Rating between 0 and 100" />
      <View style={styles.spacing} />
      <FormikTextInput style={styles.textInput} name="text" placeholder="Review" />
      <View style={styles.spacing} />
      <Button onPress={onSubmit} label='Create a review' />
    </View>
  )
}

const CreateReview = () => {
  const [newReview] = useNewReview();
  const navigate = useNavigate();
  // const authenticate = new AuthStorage()

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, text, rating } = values;

    try {
      const {createReview} = await newReview({
        ownerName,
        rating: Number(rating),
        repositoryName,
        text
      });
      navigate(`/repository/${createReview.repositoryId}`)
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <CreateReviewFrom onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;