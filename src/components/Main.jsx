import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import { Navigate, Route, Routes } from 'react-router-native';
import SignIn from './SignIn';
import Constants from 'expo-constants';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.secondary
  },
});

const Main = () => {
  console.log(Constants.manifest)

  const onSubmit = (values) => {
    console.log(values);
  }
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signIn" element={<SignIn onSubmit={onSubmit}/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/repository/:id" element={<SingleRepository/>}/>
        <Route path="/createreview" element={<CreateReview/>}/>
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/myreviews" element={<MyReviews/>} />
      </Routes>
    </View>
  );
};

export default Main;