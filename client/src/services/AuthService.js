import axios from "axios";

const API_URL = "http://localhost:4000";

export const AuthService = {
    login: async (email, password) => {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });
        return response.data;
    },

    register: async (username, email, password) => {
        const response = await axios.post(`${API_URL}/register`, {
            username,
            email,
            password,
        });
        return response.data;
    },

    logout: () => {
        localStorage.removeItem("user");
    },
};
