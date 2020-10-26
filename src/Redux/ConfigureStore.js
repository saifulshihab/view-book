import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import { Signup } from './signup';
import { profileUpdateReducer, profileInfoReucer } from './profileReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      auth: Auth,
      signup: Signup,
      userProfileInfo: profileInfoReucer,
      userProfileUpdate: profileUpdateReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};
