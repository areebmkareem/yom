import * as types from '../actionTypes';

const initialState = {
  modalProps: {
    isVisible: false,
  },
};

const global = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default global;
