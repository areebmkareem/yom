import AsyncStorage from '@react-native-async-storage/async-storage';

export const ASYNC_STORAGE_KEYS = {
  authToken: '@authToken',
};

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    throw e;
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return JSON.parse(jsonValue);
  } catch (e) {
    throw e;
  }
};

export const deleteData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.removeItem(key);
    return JSON.parse(jsonValue);
  } catch (e) {
    throw e;
  }
};
