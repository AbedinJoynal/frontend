import axios from 'axios';

const API_URL =
    'https://user-simple-crud-backend-3tvdse6vj-abedinjoynals-projects.vercel.app/'; // Adjust if your backend is on a different port

const userAPI = {
    getAllUsers: async () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${API_URL}/users`, config);
        return response;
    },
    register: async (userData) => {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response;
    },
    login: async (userData) => {
        const response = await axios.post(`${API_URL}/auth/login`, userData);
        return response;
    },
    getCurrentUser: async () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${API_URL}/auth/me`, config);
        return response;
    },
    updateUser: async (userId, updatedUser) => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.put(
            `${API_URL}/users/${userId}`,
            updatedUser,
            config
        );
        return response;
    },
    deleteUser: async (userId) => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.delete(
            `${API_URL}/users/${userId}`,
            config
        );
        return response;
    },
};

export default userAPI;
