import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import useSignOut from '../hooks/useSignOut';
import { ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    flexDirection: 'row',
  },
  text: {
    color: "white",
    margin: 10
  }
});

const AppBarTab = (props) => {
  return (
    <Link to={props.link}>
      <Text style={styles.text} fontSize='subheading'>{props.label}</Text>
    </Link>
  )
}

const AppBar = () => {
  const signOut = useSignOut();
  const { data } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label='Repositories' link='/' />

        {data?.me ?
          <>
            <AppBarTab label='Create a review' link='/createreview' />
            <AppBarTab label='My reviews' link='/myreviews' />
            <Pressable onPress={() => signOut()}><Text style={styles.text} fontSize='subheading' >Sign Out</Text></Pressable>
          </>
          :
          <>
            <AppBarTab label='Sign In' link='/SignIn' />
            <AppBarTab label='Sign Up' link='/SignUp' />
          </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;