import axios from 'axios';

const municipioApi = axios.create({
    baseURL: '/api',

});

export default municipioApi;