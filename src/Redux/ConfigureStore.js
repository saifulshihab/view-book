import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import { Signup } from './signup';
import thunk from 'redux-thunk';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      auth: Auth,
      signup: Signup,
    }),
    applyMiddleware(thunk)
  );
  return store;
};
