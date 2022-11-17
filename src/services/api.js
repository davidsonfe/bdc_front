import axios from 'axios';

const instance = axios.create({
    baseURL: "http://192.168.18.29:8080/",
});

export default instance;
