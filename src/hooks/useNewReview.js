import { useMutation } from "@apollo/client";
import { NEW_REVIEW } from "../graphql/mutations";

const useNewReview = () => {
  const [mutate, result] = useMutation(NEW_REVIEW);

  const newReview = async ({ ownerName, rating, repositoryName, text }) => {
    const { data } = await mutate({
      variables: {
        review: {
          ownerName,
          rating,
          repositoryName,
          text
        }
      }
    })
    console.log(data);
    result.reset();
    // await appolloClient.resetStore();
    return data;
  };

  return [newReview, result];
};

export default useNewReview