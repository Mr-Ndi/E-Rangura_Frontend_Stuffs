import React, { useState } from 'react';
import './AccountCreation.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AccountCreation: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8000/api/users/register/', {
                username,
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
        
            if (response.status === 201) {
                setSuccessMessage('User created successfully! You can now log in.');
                setErrorMessage(null);
            
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error message:', error.message);
            } else {
                console.error('An unknown error occurred:', error);
            }
        }
    };

    return (
        <div className="login-container">
            <div className="content">
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                
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
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirm-password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className='button'>Create an Account</button>
                    <Link to='/login'>
                        <p className="description">Already have an account? Sign in to get started!</p>
                    </Link>
                </form>
            </div>
            <div className='signup-descipt'>
            <h2>Sign Up</h2>
            <p>Hey just sign up in order to upload the product</p>
            </div>
        </div>
    );
};

export default AccountCreation;
