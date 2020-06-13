import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000' //for dev only
});

export const loginUser = credentials => api.post('/login', credentials);
export const registerUser = credentials => api.post('/register', credentials);
export const createPost = data => api.post('/create', data);

const apis = {
    loginUser,
    registerUser,
    createPost
}

export default apis