import axios from "axios";

export function signIn(password) {
  return async (dispatch) => {
    console.log('SIGNING IN', password)

    try {
      const response = await axios.post('http://localhost/auth', {
        password
      });

      dispatch({ type: 'LOGGED_IN', jwt: response.jwt });

    } catch (err) {
      console.error('Error logging in to dashboard:', err);
    }
  }
}
