import axios from 'axios';
import { AsyncStorage } from 'react-native';

const token = AsyncStorage.getItem('@CoffeePrediction:token');

const api = axios.create({
    baseURL: 'http://192.168.0.115:5000'
});    

export default api;