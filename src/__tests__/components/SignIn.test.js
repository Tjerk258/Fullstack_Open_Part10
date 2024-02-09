import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { SignInFrom } from '../../components/SignIn';
import { Formik } from 'formik';


describe('SignInForm', () => {
  it('calls function provided by onSubmit prop after pressing the LogIn Button', async () => {
    const initialValues = {
      username: '',
      password: ''
    };
    const onSubmit = jest.fn();
    render(<Formik initialValues={initialValues} onSubmit={onSubmit} >
      {({ handleSubmit }) => <SignInFrom onSubmit={handleSubmit} />}
    </Formik>);

    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
    fireEvent.press(screen.getByText('Sign In'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      })

    // onSubmit.mock.calls[0][0] contains the first argument of the first call
    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: 'kalle',
      password: 'password',
    });
  });
});