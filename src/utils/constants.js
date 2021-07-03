import axios from 'axios' 
const baseURL = "http://localhost:3001/"

const API_URL = axios.create({ baseURL })
export {API_URL};
