import * as types from '../actionTypes';

const initialState = {
  userInfo: {},
  userInfoFetching: true,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.data,
        userInfoFetching: false,
      };
    default:
      return state;
  }
};

export default auth;
