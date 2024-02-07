import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label='Repositories' link='/' />
        <AppBarTab label='Sign In' link='/SignIn' />
      </ScrollView>
    </View>
  );
};

export default AppBar;