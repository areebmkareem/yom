import {getFetchAPI, postFetchAPI} from '../../Helper/fetchAPI';
import * as types from '../actionTypes';

export const getStatics = (payload) => async (dispatch, useState) => {
  try {
    const response = await getFetchAPI('/statics', payload);
    if (response.error) throw response;
    dispatch({type: types.SET_STATICS, data: response.data});
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
