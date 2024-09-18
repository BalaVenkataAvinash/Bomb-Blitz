import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, { username, password });
      localStorage.setItem('token', response.data.token);
      setUsername("");
      setPassword("");
      navigate('/game');
    } catch (error) {
      setError(
        error.response?.data?.error || 'An error occurred during registration. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-red-50 p-6 rounded-lg shadow-md space-y-4 w-full animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-4 text-red-800">Register</h2>
      
      {error && <p className="text-red-600 text-sm font-medium text-center">{error}</p>}
      
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        className="w-full text-black px-4 py-2 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
      />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full text-black px-4 py-2 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
      />
      
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-md shadow-md text-white transition duration-200 transform hover:scale-105 ${loading ? 'bg-green-300' : 'bg-green-500 hover:bg-green-600'}`}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 108 8h-4l3 3-3-3h4a8 8 0 01-8-8z"></path>
            </svg>
            <span>Registering...</span>
          </div>
        ) : 'Register'}
      </button>
    </form>
  );
};

export default Register;
