import axios from 'axios';

const instance = axios.create({
    baseURL: "http://192.168.15.11:8080/",
    responseType: 'json'
});

export default instance;
