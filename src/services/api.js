import axios from 'axios';

const instance = axios.create({
    baseURL: "http://10.0.2.184:8080/",
    responseType: 'json'
});

export default instance;
