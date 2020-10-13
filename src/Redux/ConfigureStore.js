import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import thunk from 'redux-thunk';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      auth: Auth,
    }),
    applyMiddleware(thunk)
  );
  return store;
};
