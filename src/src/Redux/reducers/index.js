import { combineReducers } from 'redux';
import { bookListReducer, bookDetailsReducer } from './bookReducers';
import { cartReducer } from './cartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  updateUserProfileReducer,
  userListReducer,
  userDeleteReducer,
} from './userReducers';

const rootReducer = combineReducers({
  bookList: bookListReducer,
  bookDetails: bookDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: updateUserProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
});

export default rootReducer;
