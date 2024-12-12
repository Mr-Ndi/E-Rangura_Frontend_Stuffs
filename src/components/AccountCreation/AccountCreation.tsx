import React from 'react';
import './AccountCreation.css';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    alert('Login functionality not implemented yet.');
  };

  return (
    <div className="login-container">
        <div className="content">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Telephone</label>
                    <input type="password" id="password" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" id="password" required />
                </div>
                <button type="submit" className='button'>Login</button>
                <Link to='/login'>
                <p className="description">Already have an account? Sign in to get started!</p>
                </Link>
            </form>
        </div>
        <div className="signup-descipt">
        <h2>Sign up</h2>
        <p>Hey just sign up in order to upload the product</p>
        </div>
    </div>
  );
};

export default Login;
