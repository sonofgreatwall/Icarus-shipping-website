// src/pages/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error); // Get error from Redux state

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError(''); // Clear previous errors

    // Dispatch the login action
    try {
      await dispatch(login({ email, password })).unwrap(); // Use unwrap to handle fulfilled/rejected
      navigate('/main/dashboard'); // Redirect to Dashboard on success
    } catch (err) {
      setError(authError || 'Login failed. Please try again.'); // Use error from Redux state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-background"> 
      <div className="flex flex-col items-center bg-card-background rounded-lg p-10 md:p-12 border border-custom-border shadow-xl transition-all duration-300 
                      hover:shadow-bright w-full max-w-md"> 
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-text-emphasizing mb-4">Welcome Back!</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className='w-full' onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-text-normal font-semibold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-4 border border-custom-border bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-text-normal font-semibold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-4 border border-custom-border bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full p-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            Login
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-text-normal text-sm md:text-base">Don't have an account? <Link to="/register" className="text-purple-600 font-semibold hover:text-purple-700">Register</Link></p>
        </div>
        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-purple-600 hover:underline hover:text-purple-700 text-sm md:text-base">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;