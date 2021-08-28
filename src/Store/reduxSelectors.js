export const getUserInfo = (state) => state.auth.userInfo;
export const getUserFetchState = (state) => state.auth.userInfoFetching;
export const getTransactionContacts = (state) => state.contacts.transactionContacts;
export const getSearchedContacts = (state) => state.contacts.searchedContacts;
export const getAllTransactionsData = (state) => state.transactions.allTransactions;
export const getInvoiceList = (state) => state.invoice;
export const getTotalStaticsData = (state) => state.statics.totalStatics;
