import { AsyncStorage } from 'react-native';
import JWT from 'expo-jwt';

import api from '../services/api';

import { USER_TOKEN_KEY, SECRET_KEY } from '../../config';

export const clearUserToken = () => AsyncStorage.removeItem(USER_TOKEN_KEY);

export const addUserToken = (token) => AsyncStorage.setItem(USER_TOKEN_KEY, token);

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(USER_TOKEN_KEY);
  
  return (token !== null) ? token : '';
};

export const loggedUser = async () => {
  const token = await AsyncStorage.getItem(USER_TOKEN_KEY);

  if (!token) return undefined;

  const result = JWT.decode(token, SECRET_KEY);

  try {
    const response = await api.get(`/users/${result.sub}`, {
      headers: { 
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (e){
    clearUserToken();
    return undefined;
  }

};
