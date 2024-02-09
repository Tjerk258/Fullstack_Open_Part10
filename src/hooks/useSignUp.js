import { useMutation } from "@apollo/client";
import { NEW_USER } from "../graphql/mutations";

const useSignUp = () => {
  const [mutate, result] = useMutation(NEW_USER);

  const SignUp = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        user: {
          password,
          username
        }
      }
    })
    console.log(data);
    result.reset();
    return data;
  };

  return [SignUp, result];
};

export default useSignUp