import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';
import api from '../AuthContext/api';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('token'));
    const navigate = useNavigate();

    // Handle form submission for login
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setLoading(true);
        setProgress(0);
        setIsComplete(false);

        // Simulate progress bar
        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(interval);
                    return oldProgress;
                }
                return Math.min(oldProgress + Math.random() * 20, 100); 
            });
        }, 500);

        try {
            // Call the login API function
            const response = await api.login({ username, password });

            console.log(response);
            if (response) {
                // Store token in local storage
                localStorage.setItem('token', response.access);
                setIsLoggedIn(true); // Update login state
                setIsComplete(true); // Set completion state for redirection
            }

        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials and try again.');
        } finally {
            clearInterval(interval);
            setLoading(false);
        }
    };

    // Redirect to home if login is complete
    useEffect(() => {
        if (isComplete) {
            navigate('/'); // Redirect to home or desired route after login
        }
    }, [isComplete, navigate]);

    // Handle logout functionality
    const handleLogout = async () => {
        try {
            await api.logout(); // Call the logout API function
            localStorage.removeItem('token'); // Clear token from local storage
            setIsLoggedIn(false); // Update login state
            alert('You have been logged out successfully.');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="descipt">
                <h2>Login</h2>
                <p>Hey just Login in order to upload the product</p>
            </div>
            <div className="pcontent">
                {loading && (
                    <ProgressBar progress={progress} message="Logging in..." />
                )}
                
                {!isLoggedIn ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                id="username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>
                        <button type="submit" className='button'>Login</button>
                        <Link to='/create-account'>
                            <p className="description">Don't have an account? Sign up to get started!</p>
                        </Link>
                    </form>
                ) : (
                    <div>
                        <h2>It was an honor to collaborate with you!</h2>
                        <button onClick={handleLogout} className='button'>Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
