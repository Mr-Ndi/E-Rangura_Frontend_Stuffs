import React, { createContext, useContext, useState, PropsWithChildren } from 'react';

// Define the shape of the context
interface AuthContextType {
    token: string | null;
    login: (newToken: string) => void;
    logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider component
export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('accessToken'));

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem('accessToken', newToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('accessToken');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children} {/* This allows other components to receive children */}
        </AuthContext.Provider>
    );
};

// Custom hook to use the Auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
