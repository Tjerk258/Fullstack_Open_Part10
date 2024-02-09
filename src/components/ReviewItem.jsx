import { View, StyleSheet } from 'react-native';
import Text from './Text';

import theme from '../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  containerReview: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white', // You can set your desired background color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: theme.colors.primary
  },
  rating: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  review: {
    fontSize: 14,
    lineHeight: 20,
  },
});

const ReviewItem = ({ review, title }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy',);
  return (
    <View style={styles.containerReview}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.review}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem