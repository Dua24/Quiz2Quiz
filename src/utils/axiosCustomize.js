import axios from "axios"
import { useNavigate } from "react-router-dom";
const instance = axios.create({
    // baseURL: "http://localhost:8081/"
    baseURL: "https://redred-be.onrender.com/"
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, function (error) {
    window.location.href = "/err"
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // token expired
    // error.response.data.EC === -999

    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance