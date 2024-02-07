import { StyleSheet, View, StatusBar } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { useEffect } from 'react';
import theme from '../theme';
import { Navigate, Route, Routes } from 'react-router-native';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.secondary
  },
});

const Main = () => {
  useEffect(() => {
    // Set status bar style to have white icons
    StatusBar.setBarStyle('light-content');
  }, []);

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
      </Routes>
    </View>
  );
};

export default Main;