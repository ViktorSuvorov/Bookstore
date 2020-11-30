/* eslint-disable no-unused-vars */
import { createStore, applyMiddleware } from 'redux';
import Logger from 'redux-logger';
import rootReducer from './reducers';

const appStore = () => {
  const store = createStore(rootReducer, applyMiddleware(Logger));
  return store;
};
export default appStore;
