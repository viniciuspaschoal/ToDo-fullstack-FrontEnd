import api from './api'

export const getTasks = () => api.get('/task/user/1')
export const createTask = (task) => api.post('/task', task)
export const updateTask = task => api.put(`/task/${task.id}`, task);
export const deleteTask = id => api.delete(`/task/${id}`);