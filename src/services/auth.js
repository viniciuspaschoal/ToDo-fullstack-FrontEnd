//Usa o axios para criar funções específicas como login, logout, register, etc

import api from './api'

export const login = user => api.post('/login', user)
export const register = (userData) => api.post('/user', userData)

export const logout = () => {
    sessionStorage.removeItem('basicCred')
    return Promise.resolve()
}