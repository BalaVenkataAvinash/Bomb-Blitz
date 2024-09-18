import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import PastScores from './PastScores'; // Import the PastScores component

const ParentComponent = () => {
  const [pastScores, setPastScores] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPastScores = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/game/user-data`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (response.data.success) {
          setPastScores(response.data.pastScores || []);
        } else {
          setError('Failed to fetch past scores.');
        }
      } catch (error) {
        console.error('Error fetching past scores:', error);
        setError('Failed to load past scores.');
      }
    };

    fetchPastScores();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full max-w-lg mx-auto mb-8 p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
          Past Scores
        </h3>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {/* Pass pastScores as props to the PastScores component */}
        <PastScores pastScores={pastScores} />
      </div>
    </>
  );
};

export default ParentComponent;
