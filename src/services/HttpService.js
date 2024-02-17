import axios, { AxiosHeaders } from "axios";
// lodash
// import { cloneDeep } from 'lodash';

const createNewBaseUrl = (url) =>
  axios.create({
    baseURL: url,
  });

const apiService = createNewBaseUrl(import.meta.env.VITE_APP_BASE_URL);

const requestInterceptor = (config) => {
  config.params = {
    ...config.params,
    "subscription-key": import.meta.env.VITE_APP_API_KEY,
  };

  return config;
};

const requestInterceptorError = (error) => {
  console.log("there is a request error", error);
  return Promise.reject(error);
};

const responseInterceptor = (response) => {
  console.log("response interceptor:", response);
  return response;
};

const responseInterceptorError = (error) => {
  const { response } = error;
  console.log("response interceptor error:", response);

  return Promise.reject(error);
};

const addInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    requestInterceptor,
    requestInterceptorError
  );
  axiosInstance.interceptors.response.use(
    responseInterceptor,
    responseInterceptorError
  );
};

addInterceptors(apiService);

export { apiService };
