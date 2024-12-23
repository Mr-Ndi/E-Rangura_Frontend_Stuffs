import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';
import api from '../AuthContext/api';

interface AuthProps {
    setIsLoggedIn: (loggedIn: boolean) => void;
    isLoggedIn: boolean;
}

const Auth: React.FC<AuthProps> = ({ setIsLoggedIn, isLoggedIn }) => {
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
            setProgress((oldProgress) => Math.min(oldProgress + Math.random() * 20, 100));
        }, 500);

        try {
        
            const response = await api.login({ username, password });

            console.log(response);
            if (response) {
            
                localStorage.setItem('token', response.access);
                localStorage.setItem('refreshToken', response.refresh);
                setIsLoggedIn(true);
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


    const handleLogout = async () => {
        try {
          await api.logout(); // Call your logout API function
          setIsLoggedIn(false); // Update login state to false after successful logout
          alert('You have been logged out successfully.');
        } catch (error) {
          console.error('Logout failed:', error);
          alert('Logout failed. Please try again.');
        }
      };
      


    useEffect(() => {
        if (isComplete) {
            navigate('/');
        }
    }, [isComplete, navigate]);

    return (
        <div className="login-container">
            <div className="descipt">
                <h2>{isLoggedIn ? "Welcome Back!" : "Login"}</h2>
                <p>{isLoggedIn ? "You are logged in." : "Please log in to continue."}</p>
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

export default Auth;
