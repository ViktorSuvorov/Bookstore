import { combineReducers } from 'redux';
import bookReducer from './books';
import cart from './cart';

const rootReducer = combineReducers({
  bookReducer,
  cart,
});

export default rootReducer;
