import { useApolloClient, useMutation } from "@apollo/client";
import { LOG_IN } from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(LOG_IN);
  const appolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        credentials: {
          password,
          username
        }
      }
    })
    await authStorage.setAccessToken(data.authenticate.accessToken)
    result.reset();
    console.log(data);
    await appolloClient.resetStore();
    return data;
  };

  return [signIn, result];
};

export default useSignIn