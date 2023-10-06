import axios from 'axios';

const BASE_URL = 'https://private-6e2d25-whatsappclone.apiary-mock.com/';

const API_HEADERS = {
    'Content-type': 'application/json',
};

const httpRequest = axios.create({
    baseURL: BASE_URL,
    headers: API_HEADERS,
    timeout: 10000,
    responseType: 'json',
});

httpRequest.interceptors.response.use(
    response => response,
    error => {
        if (error) {
            let message;
            if (error.response) {
                if (error.response.status === 500) message = 'Something went wrong';
                else message = error.response.data.message;

                // console.log('Error API ', message);

                return Promise.reject(error);
            }
        }
    },
);

export default httpRequest;
