import axios from 'axios'

const api = axios.create({
    baseURL: 'https://dear-diary-backend-280307.uc.r.appspot.com/' 
    // baseURL: 'http://localhost:8080/' 
});

export const loginUser = credentials => api.post('/login', credentials);
export const registerUser = credentials => api.post('/register', credentials);
export const createPost = data => api.post('/create', data);
export const fetchPosts = userId => api.post('/posts', userId);

const apis = {
    loginUser,
    registerUser,
    createPost,
    fetchPosts
}

export default apis