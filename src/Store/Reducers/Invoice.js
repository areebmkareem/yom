import * as types from '../actionTypes';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INVOICES:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
