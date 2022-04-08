import axios from "axios";

const baseURL = 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data'

const axiosInstance = axios.create({baseURL})

export default axiosInstance;

