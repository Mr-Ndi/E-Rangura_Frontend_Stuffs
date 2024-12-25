import React, { useState } from 'react';
import './AccountCreation.css';
import { Link, useNavigate } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';
import api from '../AuthContext/api';

const AccountCreation: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [names, setNames] = useState('');
    const [district, setDistrict] = useState('');
    const [sector, setSector] = useState('');
    const [telephone, setTelephone] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

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
            const response = await api.createAccount({
                username,
                email,
                password,
                names,
                district,
                sector,
                telephone,
                profile_picture: '',
            });
    
            if (response) {
                setSuccessMessage('User created successfully! You can now log in.');
                setErrorMessage(null);
            
                // Simulate completion
                setIsComplete(true);

                // Redirect after a short delay
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error message:', error.message);
                setErrorMessage('An error occurred while creating the account. Please try again.');
            } else {
                console.error('An unknown error occurred:', error);
                setErrorMessage('An unknown error occurred. Please try again.');
            }
        } finally {
            clearInterval(interval);
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="content">
                {loading && (
                    <ProgressBar progress={progress} message="Creating account..." />
                )}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                
                {/* Display completion message when account creation is complete */}
                {isComplete && <div className="completion-message">Account creation completed successfully!</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="names">Full Name</label>
                        <input 
                            type="text" 
                            id="names" 
                            value={names}
                            onChange={(e) => setNames(e.target.value)}
                            required 
                        />
                    </div>
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
                        <label htmlFor="district">District</label>
                        <input 
                            type="text" 
                            id="district" 
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sector">Sector</label>
                        <input 
                            type="text" 
                            id="sector" 
                            value={sector}
                            onChange={(e) => setSector(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telephone">Telephone</label>
                        <input 
                            type="tel" 
                            id="telephone" 
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            maxLength={13}
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
            <div className='signup-description'>
                <h2>Sign Up</h2>
                <p>Hey just sign up in order to upload the product</p>
            </div>
        </div>
    );
};

export default AccountCreation;
