import React from 'react';
import ReduxContext from './CreateContext';
import actionTypes from './ActionTypes';

const initialState = {
  test: {},
  bad: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TEST_THIS:
      return {
        bad: state.bad + 1,
      };
    default:
      return state;
  }
};

const ContextApi = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <ReduxContext.Provider value={{state, dispatch}}>
      {children}
    </ReduxContext.Provider>
  );
};

export default ContextApi;
