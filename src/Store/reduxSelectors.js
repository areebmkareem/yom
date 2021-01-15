export const getUserInfo = (state) => state.auth.userInfo;
export const getUserFetchState = (state) => state.auth.userInfoFetching;
export const getTransactionContacts = (state) =>
  state.contacts.transactionContacts;
