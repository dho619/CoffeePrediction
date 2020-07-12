import axios from 'axios';
import { isSignedIn } from './auth';

const api = axios.create({
    baseURL: 'http://192.168.0.115:5000',
    headers: { 
        Authorization : `Bearer ${isSignedIn}`
    }
});

export default api;