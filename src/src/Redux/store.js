/* eslint-disable no-unused-vars */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Logger from 'redux-logger';
import rootReducer from './reducers';

const appStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk, Logger));
  return store;
};
export default appStore;
