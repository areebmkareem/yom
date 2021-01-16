import {getFetchAPI} from '../../Helper/fetchAPI';
import * as types from '../actionTypes';

export const getAllTransactions = (id) => async (dispatch) => {
  try {
    const response = await getFetchAPI(`/transactions/${id}`);
    if (response.error) throw response;
    dispatch({
      type: types.GET_ALL_TRANSACTIONS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log('error: ', error);
    alert(JSON.stringify(error));
    // return {error: true, ...error};
  }
};
