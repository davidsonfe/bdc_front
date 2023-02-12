import axios from 'axios';

const instance = axios.create({
    baseURL: "http://192.168.42.106:8080/",
    responseType: 'json'
});

export default instance;
