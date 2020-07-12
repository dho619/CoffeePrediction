import { AsyncStorage } from 'react-native';
import JWT from 'expo-jwt';

const TOKEN_KEY = 'xxx';
const SECRET_KEY = 'xxx';

export const onSignIn = (token) => AsyncStorage.setItem(TOKEN_KEY, token);

export const onSignOut = () => AsyncStorage.removeItem(TOKEN_KEY);

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  return (token !== null) ? token : '';
};

export const loggedUser = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
  
    const tokenDescrip = JWT.decode(token, SECRET_KEY)

    console.log(token)
    console.log(tokenDescrip)

    return '';
  };