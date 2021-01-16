import * as types from '../actionTypes';

const initialState = {
  allTransactions: {
    transactions: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        allTransactions: action.payload,
      };
    default:
      return state;
  }
};
