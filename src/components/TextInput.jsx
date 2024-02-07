import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

// const styles = StyleSheet.create({
//   textInput: {
//     color: theme.colors.textPrimary,
//     fontSize: theme.fontSizes.body,
//     fontFamily: theme.fonts.main,
//     fontWeight: theme.fontWeights.normal,
//     borderWidth: 1,
//     borderColor: 'grey',
//     backgroundColor: 'white',
//     height: 60,
//     borderRadius: 5,
//     padding: 20
//   }
// });

const TextInput = ({ style, error, ...props }) => {
  const styles = StyleSheet.create({
    textInput: {
      color: theme.colors.textPrimary,
      fontSize: theme.fontSizes.body,
      fontFamily: theme.fonts.main,
      fontWeight: theme.fontWeights.normal,
      borderWidth: 1,
      borderColor: error ? theme.colors.error : 'grey',
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 10
    }
  });


  const textInputStyle = [style, styles.textInput];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;