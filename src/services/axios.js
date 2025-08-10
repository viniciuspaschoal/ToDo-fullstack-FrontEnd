//Configura o axios globalmente: URL base, headers, etc

import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080', 
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api