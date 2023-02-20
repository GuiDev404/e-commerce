import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/';

const storeApi = axios.create({
  baseURL: BASE_URL,
});

storeApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token'),
  };

  return config;
});

export const getProducts = ({ queryKey }) => {
  const [_key, category = 'all'] = queryKey;

  const categoryPath = category === 'all' ? '' : `category/${category}`

  return storeApi.get(`/products/${categoryPath}`).then((res) => res.data);
};

export const getProduct = ({ queryKey }) =>
  storeApi.get(`/product/${queryKey[1]}`).then((res) => res.data);

export const getCategories = () =>
  storeApi.get(`/products/categories`).then((res) => res.data);

export const loginUser = (user) => {
  return storeApi.post(`/auth/login`, user).then((res) => res.data);
};

export const getUsers = () => {
  return storeApi.get(`/users`).then((res) => res.data);
};
