import apiClient from '../api/axiosConfig';

export const todoService = {
  getTodo: async () => {
    const response = await apiClient.get('/todos');
    return response.data.todos;
  },

  addTodo: async (todo) => {
    const response = await apiClient.post('/todos/add', todo);
    return response.data;
  },

  updateTodo: async (id, updateData) => {
    const response = await apiClient.put(`/todos/${id}`, updateData);
    return response.data;
  },

  deleteTodo: async (id) => {
    const response = await apiClient.delete(`/todos/${id}`);
    return response.data;
  },
};
