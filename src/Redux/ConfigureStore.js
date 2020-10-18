import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import { Signup } from './signup';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      auth: Auth,
      signup: Signup,
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};
