import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


function reducer(state = { loggedIn: false }, action) {
  switch (action.type) {
    case 'LOGGED_IN':
      window.dashboardJwt = action.payload;
      return {
        loggedIn: true,
        jwt: action.payload
      }
    default:
  }

  return state;
}


export default function configureStore() {
  const store = createStore(
    reducer,
    applyMiddleware(thunk),
  );

  return store;
}

