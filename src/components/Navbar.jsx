import React from 'react';
import { Link } from 'react-router-dom';
const handleLogOut=()=>{
  // localStorage.clear();
}
const Navbar = () => {
  return (
    <nav className="bg-green-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>Bomb blitz</div>
        <div className="space-x-4">
          <Link to="/game" className="hover:text-red-200">Game</Link>
          <Link to="/leaderboard" className="hover:text-red-200">Leaderboard</Link>
          <Link to="/pastscores" className="hover:text-red-200">Past Scores</Link>
          < button  onClick={handleLogOut()}><Link to ='/' className="hover:text-red-200">LogOut</Link>  </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
