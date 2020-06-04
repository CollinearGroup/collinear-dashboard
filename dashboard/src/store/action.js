import axios from "axios";

export function signIn(password) {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost/auth', {
        password
      });

      dispatch({ type: 'LOGGED_IN', payload: response.data.jwt });

    } catch (err) {
      console.error('Error logging in to dashboard:', err);
    }
  }
}
