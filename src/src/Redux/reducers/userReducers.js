/* eslint-disable import/prefer-default-export */
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants';

export const userLoginReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        isLoading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        isLoading: false,
        userInfo: payload,
      };
    case USER_LOGIN_FAIL:
      return {
        isLoading: false,
        error: payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return {
        isLoading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        isLoading: false,
        userInfo: payload,
      };
    case USER_REGISTER_FAIL:
      return {
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
