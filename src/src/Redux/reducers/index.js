import { combineReducers } from 'redux';
import { bookListReducer, bookDetailsReducer } from './bookReducers';
import { cartReducer } from './cartReducers';
import { userLoginReducer, userRegisterReducer } from './userReducers';

const rootReducer = combineReducers({
  bookList: bookListReducer,
  bookDetails: bookDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

export default rootReducer;
