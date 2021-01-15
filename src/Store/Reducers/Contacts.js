import * as types from '../actionTypes';

const initialState = {
  transactionContacts: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TRANSACTION_CONTACTS_SUCCESS:
      return {
        ...state,
        transactionContacts: action.payload,
      };
    default:
      return state;
  }
};
