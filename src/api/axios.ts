import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8069/api',
  });
  
  export default instance;