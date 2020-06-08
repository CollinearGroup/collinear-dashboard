import axios from "axios";

const endpoint = process.env.REACT_APP_AUTH_URL;

export function signIn(password) {
  return async (dispatch) => {
    try {

      if (!endpoint) {
        console.error('Endpoint for authorization service not defined');
      }

      const response = await axios.post(endpoint, {
        password
      });

      dispatch({ type: 'LOGGED_IN', payload: response.data.jwt });

    } catch (err) {
      console.error('Error logging in to dashboard:', err);
    }
  }
}
