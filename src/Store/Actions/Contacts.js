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
    alert(JSON.stringify(error));
    // return {error: true, ...error};
  }
};

export const searchContacts = (userName) => async (dispatch) => {
  try {
    const response = await getFetchAPI(`/contacts/${userName}`);
    console.log('response: ', response);
    if (response.error) throw response;
    dispatch({
      type: types.SEARCH_CONTACTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    alert(JSON.stringify(error));
    // return {error: true, ...error};
  }
};
