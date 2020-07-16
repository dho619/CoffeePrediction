import { AsyncStorage } from 'react-native';
import JWT from 'expo-jwt';
import api from './api';

const TOKEN_KEY = "@CoffeePrediction:token";
const SECRET_KEY = 'a4a8f060f3dd95f8e52217de5fbfe9b5310e8580a7cdeaaf282cfa5a5c0bf222';

export const onSignIn = (token) => AsyncStorage.setItem(TOKEN_KEY, token);

export const onSignOut = () => AsyncStorage.removeItem(TOKEN_KEY);

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  return (token !== null) ? true : false;
};

export const loggedUser = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    if (!token) return {};
  
    const result = JWT.decode(token, SECRET_KEY);

    const response = await api.get(`/users/${result.sub}`, {
      headers: { 
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.data) return {};
    
    return response.data.data?response.data.data: {};
};