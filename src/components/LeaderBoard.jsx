import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/game/leaderboard`);
        // Sort leaderboard by highScore in descending order
        const sortedLeaderboard = response.data.leaderboard.sort((a, b) => b.highScore - a.highScore);
        setLeaderboard(sortedLeaderboard);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Failed to load leaderboard.');
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-900 flex items-center justify-center">
          <p className="text-xl text-gray-800 dark:text-gray-100">Loading...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-900 flex items-center justify-center">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Leaderboard</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-dark border border-gray-300 rounded-md shadow-md">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="p-4 text-left text-gray-700 dark:text-gray-300">Rank</th>
                <th className="p-4 text-left text-gray-700 dark:text-gray-300">Username</th>
                <th className="p-4 text-left text-gray-700 dark:text-gray-300">High Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 text-gray-700 dark:text-gray-300">{index + 1}</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">{user.username}</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">{user.highScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
