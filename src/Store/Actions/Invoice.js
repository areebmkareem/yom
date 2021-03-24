import {getFetchAPI, postFetchAPI} from '../../Helper/fetchAPI';
import * as types from '../actionTypes';

export const createInvoice = (payload) => async (dispatch) => {
  try {
    const response = await postFetchAPI('/invoice', payload);

    if (response.error) throw response;
    // dispatch({
    //   type: types.TRANSACTION_CONTACTS_SUCCESS,
    //   payload: response.data,
    // });
  } catch (error) {
    alert(JSON.stringify(error));
    // return {error: true, ...error};
  }
};

export const getInvoices = () => async (dispatch) => {
  try {
    const response = await getFetchAPI('/invoice');
    if (response.error) throw response;
    dispatch({
      type: types.GET_INVOICES,
      payload: response.data,
    });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(JSON.stringify(error));
    // return {error: true, ...error};
  }
};
