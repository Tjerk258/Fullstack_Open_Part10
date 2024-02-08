import { FlatList, View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import Chip from './Chip';
import Stat from './Stat';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: 'white'
  },
  imageTitleContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  TitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 20
  },
  title: {
    marginBottom: 5,
  },
  description: {
    color: 'grey'
  },
  chipContainer: {
    flexDirection: 'row',
    marginLeft: 70
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10
  }
});


const ItemSeparator = () => <View style={styles.separator} />;


const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageTitleContainer}>
        <Image style={styles.image} source={{ uri: repository.ownerAvatarUrl }} />
        <View style={styles.TitleContainer}>
          <Text fontWeight='bold' fontSize='heading' style={styles.title}>{repository.fullName}</Text>
          <Text fontSize='subheading' style={styles.description}>{repository.description}</Text>
        </View>
      </View>
      <View style={styles.chipContainer}>
        <Chip label={repository.language}/>
      </View>
      <View style={styles.statsContainer}>
        <Stat number={repository.stargazersCount} label='Stars'/>
        <Stat number={repository.forksCount} label='Forks'/>
        <Stat number={repository.reviewCount} label='Reviews'/>
        <Stat number={repository.ratingAverage} label='Rating'/>
      </View>
    </View>
  )
}

const RepositoryList = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  if(loading) {
    return <Text>Loading...</Text>
  }
  if(error) {
    return <Text>Error...</Text>
  }

  // Get the nodes from the edges array
  const repositoryNodes = data
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={item => item.id}
    // other props
    />
  );
};

export default RepositoryList;