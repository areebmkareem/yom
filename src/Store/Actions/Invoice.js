import {getFetchAPI, postFetchAPI} from '../../Helper/fetchAPI';
import * as types from '../actionTypes';
import {getInvoiceList} from '../reduxSelectors';

export const createInvoice = (payload) => async (dispatch, useState) => {
  try {
    const state = useState();
    let data = {...getInvoiceList(state)};

    let invoices = [...data.payload];
    let totalCount = invoices.length + 1;

    const response = await postFetchAPI('/invoice', payload);
    if (response.error) throw response;
    invoices.push(response.data);
    data.payload = invoices;
    data.totalCount = totalCount;
    dispatch({
      type: types.GET_INVOICES,
      payload: response.data,
    });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};

export const getInvoices = () => async (dispatch, useStore) => {
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
