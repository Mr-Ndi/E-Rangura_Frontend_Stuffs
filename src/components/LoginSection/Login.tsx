import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
        const response = await axios.post('http://localhost:8000/api/users/login/', {
            username,
            password
        });

      
        console.log(response.data);
        alert('Login successful!');
        
      
        navigate('/');

    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.');
    }
};


  return (
    <div className="login-container">
        <div className="descipt">
            <h2>Login</h2>
            <p>Hey just Login in order to upload the product</p>
        </div>
        <div className="content">
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
