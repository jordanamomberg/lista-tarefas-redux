import axios from 'axios'; 

const api = axios.create({
    baseURL: 'https://tarefas.viniciuss.dev/api',
}) 

export default api;