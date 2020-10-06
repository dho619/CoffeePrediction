import axios from 'axios';
import { HOST_API } from '../../config.js';

const api = axios.create({
    baseURL: HOST_API
});    

export default api;