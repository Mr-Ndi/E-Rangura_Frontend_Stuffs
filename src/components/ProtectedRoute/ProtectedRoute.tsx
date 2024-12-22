import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/axiosInstance';

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { token } = useAuth(); // Get the token from AuthContext

    // If there is no token, redirect to login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // If authenticated, return the child components
    return children;
};

export default ProtectedRoute;
