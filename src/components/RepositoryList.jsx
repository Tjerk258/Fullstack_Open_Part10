import { FlatList, View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import Chip from './Chip';
import Stat from './Stat';
import { Link } from 'react-router-native';
import React, { useState } from 'react';
import useRepositories from '../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker';
import TextInput from './TextInput';
import { useDebounce } from 'use-debounce';

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


export const RepositoryItem = ({ repository }) => {
  return (
    <Link to={`/repository/${repository.id}`}>
      <View style={styles.container} testID="repositoryItem">
        <View style={styles.imageTitleContainer}>
          <Image style={styles.image} source={{ uri: repository.ownerAvatarUrl }} />
          <View style={styles.TitleContainer}>
            <Text fontWeight='bold' fontSize='heading' style={styles.title}>{repository.fullName}</Text>
            <Text fontSize='subheading' style={styles.description}>{repository.description}</Text>
          </View>
        </View>
        <View style={styles.chipContainer}>
          <Chip label={repository.language} />
        </View>
        <View style={styles.statsContainer}>
          <Stat number={repository.stargazersCount} label='Stars' />
          <Stat number={repository.forksCount} label='Forks' />
          <Stat number={repository.reviewCount} label='Reviews' />
          <Stat number={repository.ratingAverage} label='Rating' />
        </View>
      </View>
    </Link>
  )
}

export const RepositoryListHeader = ({ filter, setFilter, search, setSearch }) => (
  <>
    <TextInput onChangeText={(value) => setSearch(value)} value={search} placeholder='Search' />
    <Picker
      selectedValue={filter}
      onValueChange={itemValue =>
        setFilter(itemValue)
      }>
      <Picker.Item label="latest repositories" value="CREATED_AT" />
      <Picker.Item label="Highest rated" value="HIGHEST_RATED" />
      <Picker.Item label="Lowest rated" value="LOWEST_RATED" />
    </Picker>
  </>
);

// export const RepositoryListContainer = ({ data, filter, setFilter, search, setSearch }) => {

//   // Get the nodes from the edges array
//   console.log(data);
//   const repositoryNodes = data
//     ? data.repositories.edges.map(edge => edge.node)
//     : [];


//   return (
//     <FlatList
//       data={repositoryNodes}
//       ItemSeparatorComponent={ItemSeparator}
//       renderItem={({ item }) => <RepositoryItem repository={item} />}
//       keyExtractor={item => item.id}
//       ListHeaderComponent={() => <FilterPicker filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} />}
//     />
//   );
// };

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const { filter, setFilter, search, setSearch } = this.props;

    return (
      <RepositoryListHeader
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />
    );
  };

  render() {
    const data = this.props.data;
    const repositoryNodes = data
      ? data.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem repository={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [filter, setFilter] = useState("CREATED_AT");
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 500);

  let variables;
  switch (filter) {
    case 'HIGHEST_RATED':
      variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' }
      break;
    case 'LOWEST_RATED':
      variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
      break;
    default:
      variables = { orderBy: 'CREATED_AT', orderDirection: 'DESC' }
  }


  const { repositories, fetchMore } = useRepositories({first: 10, searchKeyword: searchValue, ...variables});

  console.log(repositories);
  const onEndReach = () => {
    fetchMore()
    console.log('end reached');
  };

  // if (loading) {
  //   return <Text>Loading...</Text>
  // }
  // if (error) {
  //   return <Text>Error...</Text>
  // }

  return <RepositoryListContainer data={repositories} setFilter={setFilter} filter={filter} search={search} setSearch={setSearch} onEndReach={onEndReach}/>;


};

export default RepositoryList;