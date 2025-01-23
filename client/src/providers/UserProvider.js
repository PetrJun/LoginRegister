import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from "../services/AuthService";

// Create UserContext
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user from session storage when the app starts
    useEffect(() => {
        const storedToken = sessionStorage.getItem('user');
        if (storedToken) {
            try {
                const decodedUser = jwtDecode(storedToken);
                setUser(decodedUser);
            } catch (error) {
                console.error('Invalid token:', error);
                sessionStorage.removeItem('user'); // Remove invalid token
            }
        }
    }, []);

    // Save user (token) to session storage whenever it changes
    useEffect(() => {
        if (user) {
            const token = user.token; // Assuming the user object has a token property
            sessionStorage.setItem('user', token);
        } else {
            sessionStorage.removeItem('user');
        }
    }, [user]);

    const login = async (email, password) => {
        try {
            const token = await AuthService.login(email, password);
            sessionStorage.setItem('user', token);
            const decodedUser = jwtDecode(token);
            setUser({ ...decodedUser, token });
        } catch (error) {
            console.error('Invalid email or password:', error);
        }
    };

    const register = async (username, email, password) => {
        try {
            const token = await AuthService.register(username, email, password);
            sessionStorage.setItem('user', token);
            const decodedUser = jwtDecode(token);
            setUser({ ...decodedUser, token });
        } catch (error) {
            console.error('Invalid username or email or password: ', error);
        }
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};