import * as types from '../actionTypes';

const initialState = {
  transactionContacts: {},
  searchedContacts: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TRANSACTION_CONTACTS_SUCCESS:
      return {
        ...state,
        transactionContacts: action.payload,
      };
    case types.SEARCH_CONTACTS_SUCCESS:
      return {
        ...state,
        searchedContacts: action.payload,
      };
    default:
      return state;
  }
};
