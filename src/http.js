import axios from 'axios'
import { useStore } from './stores/new';

export const http = axios.create({
    // headers: authHeader()
    // baseURL: '/api',
})


http.interceptors.request.use(function (request) {

    const isApiUrl = request.url?.startsWith('/api');
    const store = useStore();
    const { jwt } = store;
    if (isApiUrl && jwt) {
        return {
            ...request,
            headers: {
                ...request.headers,
                Authorization: `Bearer ${jwt}`
            }
        }
    }
    return request;

}, function (error) {
    console.log("axios interceptor error", error);
    return Promise.reject(error);
});
