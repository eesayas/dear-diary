import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000' //for dev only
});

// export const 