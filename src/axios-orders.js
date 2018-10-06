import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-518f8.firebaseio.com/'
});

export default instance;