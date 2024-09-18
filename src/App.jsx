// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
// import Game from './components/Game';
// import PrivateRoute from './components/PrivateRoute';
// import Leaderboard from './components/LeaderBoard';
// import PastScores from './components/PastScores';
// import Navbar from './components/Navbar';
// function App() {
//   return (
//     <div className="App">
//       {/* <Navbar/> */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/game" element={
//           <PrivateRoute>
//             <Game />
//           </PrivateRoute>
//         } />
//         <Route path="/leaderboard" element={<Leaderboard/>}/>
//         <Route path="/pastscores" element={<PastScores/>}/>

//       </Routes>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import PrivateRoute from './components/PrivateRoute';
import Leaderboard from './components/LeaderBoard';
import PastScores from './components/PastScores';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={
          <PrivateRoute>
            <Game />
          </PrivateRoute>
        } />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/pastscores" element={<PastScores />} />
      </Routes>
    </div>
  );
}

export default App;
