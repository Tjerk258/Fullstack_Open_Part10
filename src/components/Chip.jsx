import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  chip: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    flexBasis: 'auto',
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    color: 'white',
  },
});


const Chip = ({ label }) => {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
};

export default Chip;