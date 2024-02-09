import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  // let variables;
  // switch (filter) {
  //   case 'HIGHEST_RATED':
  //     variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC', searchKeyword, first }
  //     break;
  //   case 'LOWEST_RATED':
  //     variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC', searchKeyword, first }
  //     break;
  //   default:
  //     variables = { orderBy: 'CREATED_AT', orderDirection: 'DESC', searchKeyword, first }
  // }

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };

};

export default useRepositories;