import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
const PastScores = () => {
  //  let pastScores ;
  useEffect(()=>{
    fetchUserData();
  },[])
  // const [error, setError] = useState('');
  const [pastScores, setPastScores] = useState([]);

  const fetchUserData = async () => {
    try {
      console.log(localStorage.getItem('token'));
      if (!localStorage.getItem('token')) {
        console.error('No token found');
        return;
      }
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/game/user-data`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log(response);
      setPastScores(response.data.pastScores || []);
    } catch (error) {
      console.error('Error fetching user data:', error.response ? error.response.data : error.message);
    }
  };  
  return (
    <>
      <Navbar />
      <div className="w-full max-w-lg mx-auto mb-8 p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold text-black-800 dark:text-black-100 mb-4 text-center">
          Past Scores
        </h3>
        <div className="w-full max-w-lg mb-8">
          <h3 className="text-xl font-semibold text-black-800 dark:text-black-100 mb-2">Past Scores:</h3>
          <ul className="list-disc list-inside text-black-700 dark:text-black-300">
            {pastScores.map((score, index) => (
              <li key={index}>{score}</li>
            ))}
          </ul>
        </div> 
      </div>
    </>
  );
};

export default PastScores;
