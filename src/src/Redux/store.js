/* eslint-disable no-unused-vars */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Logger from 'redux-logger';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, Logger)));

export default store;
