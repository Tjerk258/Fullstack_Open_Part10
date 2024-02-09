import { View, StyleSheet, Linking, FlatList } from 'react-native';
import Text from './Text';
import { RepositoryItem } from './RepositoryList';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import Button from './Button';
import { useNavigate, useParams } from 'react-router-native';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  Text: {
    color: 'grey',
    textAlign: 'center',
  },
  numberText: {
    marginBottom: 5,
    textAlign: 'center'
  },
  separator: {
    height: 10,
  },
  button: {
    margin: 10,
  },
  reviewText: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  }
});

const RepositoryInfo = ({ repository }) => (
  <>
    <View style={styles.container}>
      <RepositoryItem repository={repository} />
      <Button style={styles.button} label='to github' onPress={() => Linking.openURL(repository.url)} />
    </View>
    <ItemSeparator />
  </>
);

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({ repositoryId: id, first: 10 })

  if(!repository) {
    return null;
  }

  console.log(repository);

  const reviews = repository.reviews.edges.map(review => review.node);

  const onEndReach = () => {
    console.log("endreach");
    fetchMore()
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} title={item.user.username} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    // ...+
    />
  );
};

export default SingleRepository;


