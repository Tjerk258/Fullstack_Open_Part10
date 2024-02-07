import { FlatList, View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import Chip from './Chip';
import Stat from './Stat';


const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];

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
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={item => item.id}
    // other props
    />
  );
};

export default RepositoryList;