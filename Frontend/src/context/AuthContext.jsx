import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: async () => { },
    register: async () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for persisted user on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await api.post("/auth/login", { email, password });
            const data = response.data;

            const userData = {
                id: data.userId,
                name: data.fullName,
                email: data.email,
                role: data.roles && data.roles.includes("ROLE_ADMIN") ? "admin" : "user",
                token: data.token
            };

            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error(error.response?.data?.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData) => {
        setIsLoading(true);
        try {
            const payload = {
                fullName: userData.name,
                email: userData.email,
                password: userData.password
            };
            const response = await api.post("/auth/register", payload);
            return response.data;
        } catch (error) {
            console.error("Registration failed:", error);
            throw new Error(error.response?.data?.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
