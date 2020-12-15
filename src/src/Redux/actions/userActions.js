import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../constants';
import { userLoginApi, userRegisterApi } from '../../Api/User/userApi';

export const userLoginRequest = () => ({
  type: USER_LOGIN_REQUEST,
});

export const userLoginSuccess = (data) => ({
  type: USER_LOGIN_SUCCESS,
  payload: data,
});

export const userLoginError = (error) => ({
  type: USER_LOGIN_FAIL,
  payload:
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
});

export const userRegisterRequest = () => ({
  type: USER_REGISTER_REQUEST,
});

export const userRegisterSuccess = (data) => ({
  type: USER_REGISTER_SUCCESS,
  payload: data,
});

export const userRegisterError = (error) => ({
  type: USER_REGISTER_FAIL,
  payload:
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
});

export const logout = () => ({
  type: USER_LOGOUT,
});

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const { data } = await userLoginApi(email, password);
    dispatch(userLoginRequest());
    dispatch(userLoginSuccess(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    userLoginError(error);
    console.log('error');
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem('userInfo');
    dispatch(logout());
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    const { data } = await userRegisterApi(name, email, password);
    dispatch(userRegisterRequest());
    dispatch(userRegisterSuccess(data));
    dispatch(userLoginSuccess(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    userRegisterError(error);
    console.log('error');
  }
};
