import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './components/pages/Home'
import Tournaments from './components/pages/TournamentList.jsx';
import Tournament from './components/pages/Tournament.jsx';
import Login from './components/pages/Login.jsx'
import jwt_decode from "jwt-decode"
import Profile from './components/pages/Profile';

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      const decoded = jwt_decode(accessToken)
      setCurrentUser(decoded.user_id)
    }
  }, [])

  return (
  <Router>
    <Routes>
      <Route 
        path="/"
        element={
          <Home />
        }
      />

      <Route 
        path='/login'
        element={
          <Login />
        }
      />

      <Route 
        path='/profile'
        element={
          <Profile
            currentUser={currentUser}
          />
        }
      />

      <Route
        path="/tournaments"
        element={
          <Tournaments />
        }
      />

      <Route
        path='/tournament/:id'
        element={
          <Tournament />
        }
      />
    </Routes>
  </Router>
  )
}

export default App;
