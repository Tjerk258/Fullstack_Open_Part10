import { useApolloClient } from "@apollo/client";
import useAuthStorage from '../hooks/useAuthStorage';

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const appolloClient = useApolloClient();

  const SignOut = async () => {
    await authStorage.removeAccessToken();
    await appolloClient.resetStore();
  };

  return SignOut;
};

export default useSignOut