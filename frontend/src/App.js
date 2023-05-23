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
import Header from './components/partials/Header';
import API from './API';


function HeaderWrapper({children, handleLogout, currentUser, userProfile}) {
  return (
    <>
      <Header handleLogout={handleLogout} currentUser={currentUser} userProfile={userProfile} />
      {children}
    </>
  )
}

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState({})
  
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      const decoded = jwt_decode(accessToken)
      setCurrentUser(decoded.user_id)
    }
  }, [])

  useEffect(() => {
    if(currentUser) {
      const getProfile = async () => {
        if (currentUser) {
            const findProfile = await API.get(`/api/users/${currentUser}`)
            setUserProfile(findProfile.data)
        }
    }
    getProfile()
    }
  }, [currentUser])

  const handleLogout = () => {
    console.log("logout")
  }

  return (
  <Router>
    <Routes>
      <Route 
        path="/"
        element={
          <Home userProfile={userProfile}/>
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
          <HeaderWrapper handleLogout={handleLogout} currentUser={currentUser} userProfile={userProfile}>
            <Profile
              currentUser={currentUser}
            />
          </HeaderWrapper>
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
