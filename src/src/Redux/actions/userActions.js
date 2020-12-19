/* eslint-disable no-unused-vars */
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_DETAILS_RESET,
  USER_LIST_RESET,
  USER_UPDATE_PROFILE_RESET,
} from '../constants';
import {
  userLoginApi,
  userRegisterApi,
  userGetProfileApi,
  updateUserProfileApi,
  getUsersListApi,
  deleteUserByIdApi,
  updateUserProfileByAdminApi,
} from '../../Api/User/userApi';

export const userLoginRequest = () => ({
  type: USER_LOGIN_REQUEST,
});

export const userLoginSuccess = (data) => ({
  type: USER_LOGIN_SUCCESS,
  payload: data,
});

export const userLoginError = (error) => ({
  type: USER_LOGIN_FAIL,
  payload: error.data.message,
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
  payload: error.data.message,
});

export const userDetailsRequest = () => ({
  type: USER_DETAILS_REQUEST,
});

export const userDetailsSuccess = (data) => ({
  type: USER_DETAILS_SUCCESS,
  payload: data,
});

export const userDetailsReset = () => ({
  type: USER_DETAILS_RESET,
});

export const userDetailsError = (error) => ({
  type: USER_DETAILS_FAIL,
  payload: error.data.message,
});

export const userUpdateProfileRequest = () => ({
  type: USER_UPDATE_PROFILE_REQUEST,
});

export const userUpdateProfileSuccess = (data) => ({
  type: USER_UPDATE_PROFILE_SUCCESS,
  payload: data,
});

export const userUpdateProfileError = (error) => ({
  type: USER_UPDATE_PROFILE_FAIL,
  payload: error.data.message,
});

export const userUpdateProfileReset = () => ({
  type: USER_UPDATE_PROFILE_RESET,
});

export const logout = () => ({
  type: USER_LOGOUT,
});

export const userListRequest = () => ({
  type: USER_LIST_REQUEST,
});

export const userListSuccess = (data) => ({
  type: USER_LIST_SUCCESS,
  payload: data,
});

export const userListError = (error) => ({
  type: USER_LIST_FAIL,
  payload: error.data.message,
});

export const userListReset = () => ({
  type: USER_LIST_RESET,
});

export const userDeleteRequest = () => ({
  type: USER_DELETE_REQUEST,
});

export const userDeleteSuccess = () => ({
  type: USER_DELETE_SUCCESS,
});

export const userDeleteError = (error) => ({
  type: USER_DELETE_FAIL,
  payload: error.data.message,
});

export const userUpdateRequest = () => ({
  type: USER_UPDATE_REQUEST,
});

export const userUpdateSuccess = () => ({
  type: USER_UPDATE_SUCCESS,
});

export const userUpdateError = (error) => ({
  type: USER_UPDATE_FAIL,
  payload: error.data.message,
});

export const userUpdateReset = () => ({
  type: USER_UPDATE_RESET,
});

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const { data } = await userLoginApi(email, password);
    dispatch(userLoginRequest());
    dispatch(userLoginSuccess(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(userLoginError(error));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem('userInfo');
    dispatch(logout());
    dispatch(userDetailsReset());
    dispatch(userListReset());
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
    dispatch(userRegisterError(error));
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    const { data } = await userGetProfileApi(id, getState);
    dispatch(userDetailsRequest());
    dispatch(userDetailsSuccess(data));
  } catch (error) {
    dispatch(userDetailsError(error));
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    const { data } = await updateUserProfileApi(user, getState);
    dispatch(userUpdateProfileRequest());
    dispatch(userUpdateProfileSuccess(data));
  } catch (error) {
    const { message } = error.data;
    if (message === 'Not authorized') {
      dispatch(logout());
    }
    dispatch(userUpdateProfileError(error));
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    const { data } = await getUsersListApi(getState);
    dispatch(userListRequest());
    dispatch(userListSuccess(data));
  } catch (error) {
    const { message } = error.data;
    if (message === 'Not authorized') {
      dispatch(logout());
    }
    dispatch(userListError(error));
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    const { data } = await deleteUserByIdApi(id, getState);
    dispatch(userDeleteRequest());
    dispatch(userDeleteSuccess(data));
  } catch (error) {
    const { message } = error.data;
    if (message === 'Not authorized') {
      dispatch(logout());
    }
    dispatch(userDeleteError(error));
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    const { data } = await updateUserProfileByAdminApi(user, getState);
    dispatch(userUpdateRequest());
    dispatch(userUpdateSuccess());
    dispatch(userDetailsSuccess(data));
  } catch (error) {
    const { message } = error.data;
    if (message === 'Not authorized') {
      dispatch(logout());
    }
    dispatch(userUpdateError(error));
  }
};
