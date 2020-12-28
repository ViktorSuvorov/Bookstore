import { combineReducers } from 'redux';
import {
  bookListReducer,
  bookDetailsReducer,
  bookDeleteReducer,
  bookCreateReducer,
  bookUpdateReducer,
  bookReviewCreateReducer,
  bookReviewUpdateReducer,
  bookReviewDeleteReducer,
  bookKeywordReducer,
} from './bookReducers';
import { cartReducer } from './cartReducers';
import { favoriteReducer } from './favoriteReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  updateUserProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './userReducers';

const rootReducer = combineReducers({
  bookList: bookListReducer,
  bookDetails: bookDetailsReducer,
  bookDelete: bookDeleteReducer,
  bookCreate: bookCreateReducer,
  bookUpdate: bookUpdateReducer,
  bookReviewCreate: bookReviewCreateReducer,
  bookReviewUpdate: bookReviewUpdateReducer,
  bookReviewDelete: bookReviewDeleteReducer,
  cart: cartReducer,
  favorite: favoriteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: updateUserProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  keyword: bookKeywordReducer,
});

export default rootReducer;
