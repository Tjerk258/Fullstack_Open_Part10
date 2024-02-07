import { StyleSheet } from 'react-native';
import theme from '../theme';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Text from './Text';

const styles = StyleSheet.create({
  Button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignContent: 'center',
    justifyContent: 'center'
  },
  Text: {
    textAlign: 'center',
    color: 'white',
    fontSize: theme.fontSizes.subheading,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
  }
});

const Button = ({label, style, onPress, ...props }) => {
  const textInputStyle = [style, styles.Button];

  return <Pressable onPress={onPress} style={textInputStyle} {...props} ><Text style={styles.Text}>{label}</Text></Pressable>;
};

export default Button;