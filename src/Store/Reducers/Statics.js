import * as types from '../actionTypes';

const initialState = {
  totalStatics: {totalCommission: 0, totalCreditedToAccount: 0, totalHours: 0, totalTax: 0},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_STATICS:
      return {
        ...state,
        totalStatics: action.data,
      };
    default:
      return state;
  }
};
