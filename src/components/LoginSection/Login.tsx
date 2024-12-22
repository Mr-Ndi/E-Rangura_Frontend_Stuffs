import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';
import api from '../AuthContext/api'; // Import your API functions

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setLoading(true);
        setProgress(0);
        setIsComplete(false);

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
            // Use the custom API function for login
            const response = await api.login({ username, password });

            console.log(response); // Adjust based on your API response structure
            if (response) {
                // Store the token in local storage
                localStorage.setItem('token', response.access); // Adjust based on your API response structure

                setIsComplete(true);
            }

        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials and try again.');
        } finally {
            clearInterval(interval);
            setLoading(false);
        }
    };

    // Redirect when progress is complete
    useEffect(() => {
        if (isComplete) {
            navigate('/'); // Redirect to home or desired route after login
        }
    }, [isComplete, navigate]);

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
            </div>
        </div>
    );
};

export default Login;
