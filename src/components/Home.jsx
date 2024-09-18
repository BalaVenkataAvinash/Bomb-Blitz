import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Home = () => {
  const [activeForm, setActiveForm] = useState('login');

  return (
    <div className="home flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-500 to-green-500 text-white p-4">
      <h1 className="text-4xl font-bold mb-6 animate-fade-in">Welcome to Bomb Blitz</h1>
      
      <div className="form-toggle flex space-x-4 mb-8">
        <button
          className={`py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${activeForm === 'login' ? 'bg-white text-red-500' : 'bg-red-700 text-white'}`}
          onClick={() => setActiveForm('login')}
        >
          Login
        </button>
        <button
          className={`py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${activeForm === 'register' ? 'bg-white text-green-500' : 'bg-green-700 text-white'}`}
          onClick={() => setActiveForm('register')}
        >
          Register
        </button>
      </div>
      
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg animate-slide-in">
        {activeForm === 'login' ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Home;
