import {BASE_URL} from '../Config';
import {ASYNC_STORAGE_KEYS, getData} from './asyncStorage';

export const getFetchAPI = async (URL_ROUTE, payload) => {
  const URL = BASE_URL + URL_ROUTE;
  const token = await getData(ASYNC_STORAGE_KEYS.authToken);
  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token,
    },
  });
  const jsonData = await response.json();
  return jsonData;
};

export const postFetchAPI = async (URL_ROUTE, payload) => {
  try {
    const URL = BASE_URL + URL_ROUTE;
    const token = await getData(ASYNC_STORAGE_KEYS.authToken);
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify(payload),
    });
    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    return {error: true, ...error};
  }
};
