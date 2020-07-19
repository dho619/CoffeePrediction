import { AsyncStorage } from 'react-native';
import JWT from 'expo-jwt';

//importando api
import api from '../services/api';

//importa da config o nome do token
import { USER_TOKEN_KEY, SECRET_KEY } from '../../config';

//limpa o token do usuario do Storage
export const clearUserToken = () => AsyncStorage.removeItem(USER_TOKEN_KEY);

//adiciona o token do usuario no Storage
export const addUserToken = (token) => AsyncStorage.setItem(USER_TOKEN_KEY, token);

//retorna se o token do usuario
export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(USER_TOKEN_KEY);

  return (token !== null) ? token : '';
};

//retorna o usuario que esta logado
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
