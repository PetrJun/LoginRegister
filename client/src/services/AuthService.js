import axios from "axios";

const API_URL = "http://localhost:4000";

export const AuthService = {
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                password,
            });
            if (response.data) {
                return response.data;
            } else {
                throw new Error("Invalid login response");
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Failed to login. Please try again.");
        }
    },

    register: async (username, email, password) => {
        try {
            const response = await axios.post(`${API_URL}/register`, {
                username,
                email,
                password,
            });
            if (response.data) {
                return response.data;
            } else {
                throw new Error("Invalid login response");
            }
        } catch (error) {
            console.error("Registration failed:", error);
            throw new Error("Failed to register. Please try again.");
        }
    },

    logout: () => {
        localStorage.removeItem("user");
    },
};
