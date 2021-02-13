import Snackbar from 'react-native-snackbar';
import {
  ASYNC_STORAGE_KEYS,
  storeData,
  deleteData,
} from '../../Helper/asyncStorage';
import * as types from '../actionTypes';
import {postFetchAPI, getFetchAPI} from '../../Helper/fetchAPI';
import {getUserInfo as getUserInfoState} from '../reduxSelectors';

export const signInWithEmailAndPassword = (payload) => async (dispatch) => {
  try {
    const response = await postFetchAPI('/login', payload);
    if (response.error) throw response;
    const data = response.data;
    await storeData(ASYNC_STORAGE_KEYS.authToken, data.token);
    dispatch(setUserInfo(data.user));
    return Promise.resolve(true);
  } catch (error) {
    Snackbar.show({
      backgroundColor: '#ff7961',
      text: error.message,
      duration: Snackbar.LENGTH_SHORT,
      action: {
        text: 'OK',
      },
    });
    return Promise.resolve(error);
  }
};

export const verifyOtp = (payload) => async (dispatch, getState) => {
  try {
    const userInfo = getUserInfoState(getState());
    const response = await postFetchAPI('/verify-otp', payload);
    if (response.error) throw response;
    Snackbar.show({
      backgroundColor: '#5efc82',
      text: response.message,
      duration: Snackbar.LENGTH_LONG,
      action: {
        text: 'OK',
      },
    });
    dispatch(setUserInfo({...userInfo, isEmailVerified: true}));
    return Promise.resolve(true);
  } catch (error) {
    Snackbar.show({
      backgroundColor: '#ff7961',
      text: error.message,
      duration: Snackbar.LENGTH_SHORT,
      action: {
        text: 'OK',
      },
    });
    return Promise.resolve(error);
  }
};

export const logout = (payload) => async (dispatch) => {
  try {
    const response = await getFetchAPI('/logout', payload);
    if (response.error) throw response;
    dispatch(setUserInfo({}));
    deleteData(ASYNC_STORAGE_KEYS.authToken);
    return Promise.resolve(true);
  } catch (error) {
    Snackbar.show({
      backgroundColor: '#ff7961',
      text: error.message,
      duration: Snackbar.LENGTH_SHORT,
      action: {
        text: 'OK',
      },
    });
    return Promise.resolve(error);
  }
};

export const signUpUserWithCredentials = (payload) => async (dispatch) => {
  try {
    const response = await postFetchAPI('/register', payload);

    if (response.error) throw response;
    const data = response.data;
    await storeData(ASYNC_STORAGE_KEYS.authToken, data.token);
    dispatch(setUserInfo(data.user));
    if (data.message) {
      Snackbar.show({
        backgroundColor: '#5efc82',
        text: data.message,
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'OK',
        },
      });
    }
    return Promise.resolve(true);
  } catch (error) {
    Snackbar.show({
      backgroundColor: '#ff7961',
      text: error.message,
      duration: Snackbar.LENGTH_SHORT,
      action: {
        text: 'OK',
      },
    });
    return Promise.resolve(error);
  }
};

export const getUserInfo = () => async (dispatch) => {
  try {
    const response = await getFetchAPI('/user');
    if (response.error) throw response;
    dispatch(setUserInfo(response.data));
  } catch (error) {
    Snackbar.show({
      backgroundColor: '#ff7961',
      text: error.message,
      duration: Snackbar.LENGTH_SHORT,
      action: {
        text: 'OK',
      },
    });
    dispatch(setUserInfo({}));
    return Promise.resolve(error);
  }
};

export const setUserInfo = (data) => {
  return {
    type: types.SET_USER_INFO,
    data,
  };
};
