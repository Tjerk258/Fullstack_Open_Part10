import { View, StyleSheet, FlatList, Alert } from 'react-native';
import Text from './Text';
import { useMutation, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import ReviewItem from './ReviewItem';
import Button from './Button';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    flexGrow: 1,
    margin: 10
  },
  container: {
    backgroundColor: 'white'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewItem = ({ item, refetch }) => {
  const navigate = useNavigate();

  const [mutate] = useMutation(DELETE_REVIEW);

  const deleteHandle = async () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'CANCEL',
        style: 'cancel',
      },
      {
        text: 'DELETE',
        onPress: async () =>{
          await mutate({
            variables: {
              deleteReviewId: item.id
            }
          })
          refetch()
        } 
      },
    ])
  }
  return (
    <View style={styles.container}>
      <ReviewItem review={item} title={item.repository.fullName} />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} label='View repository' onPress={() => navigate(`/repository/${item.repository.id}`)}></Button>
        <Button style={{ backgroundColor: theme.colors.error, ...styles.button }} label='Delete review' onPress={deleteHandle}></Button>
      </View>
    </View>
  );
}

const MyReviews = () => {
  const { data, error, loading, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network'
  });
  if (loading) {
    return <Text>Loading...</Text>;
  } else if (error) {
    return <Text>Error</Text>;
  }
  console.log(data);

  const reviews = data.me.reviews.edges.map(review => review.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <MyReviewItem item={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    // ...
    />
  );
};

export default MyReviews;


