import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    alert('Login functionality not implemented yet.');
  };

  return (
    <div className="login-container">
        <div className="descipt">
        <h2>Login</h2>
        <p>Hey just sign up in order to upload the product</p>
        </div>
        <div className="content">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required />
                </div>
                <button type="submit" className='button'>Login</button>
                <Link to='/signup'>
                <p className="description">Don't have an account? Sign up to get started!</p>
                </Link>
            </form>
        </div>
    </div>
  );
};

export default Login;
