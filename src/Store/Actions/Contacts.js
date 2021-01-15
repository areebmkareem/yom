import {getFetchAPI} from '../../Helper/fetchAPI';
import * as types from '../actionTypes';

export const getUserTransactionContacts = () => async (dispatch) => {
  try {
    const response = await getFetchAPI('/contacts');
    if (response.error) throw response;
    dispatch({
      type: types.TRANSACTION_CONTACTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // return {error: true, ...error};
  }
};
