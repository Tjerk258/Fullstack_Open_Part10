import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    color: 'grey',
    textAlign: 'center',
  },
  numberText: {
    marginBottom: 5,
    textAlign: 'center'
  },
});


const Stat = ({ label, number }) => {
  const labelNumber = number >= 1000 ? `${String((number / 1000).toFixed(1))}k` : String(number);

  return (
    <View style={styles.chip}>
      <Text fontWeight='bold' style={styles.numberText}>{labelNumber}</Text>
      <Text style={styles.Text}>{label}</Text>
    </View>
  );
};

export default Stat;