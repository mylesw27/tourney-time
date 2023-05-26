import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './components/pages/Home'
import TournamentList from './components/pages/TournamentList.jsx';
import Tournament from './components/pages/Tournament.jsx';
import Login from './components/pages/Login.jsx'
import jwt_decode from "jwt-decode"
import Profile from './components/pages/Profile';
import Header from './components/partials/Header';
import API from './API';
import TournamentForm from './components/partials/TournamentForm';
import Scorecard from './components/pages/Scorecard';
import AllTournamentList from './components/pages/AllTournamentList'
import EditProfile from './components/pages/EditProfile';


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
      try {API.post('logout/', {refresh_token:localStorage.getItem('refresh_token')} , {headers: {'Content-Type': 'application/json'}}, {withCredentials: true})
      localStorage.clear() 
      axios.defaults.headers.common['Authorization'] = null
      window.location.href = '/'
    } catch(err) {
      console.log(err)
    }
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
              currentUser={currentUser} userProfile={userProfile}
            />
          </HeaderWrapper>
        }
      />

      <Route
        path='/edit/profile'
        element= {
          <HeaderWrapper handleLogout={handleLogout} currentUser={currentUser} userProfile={userProfile}>
            <EditProfile currentUser={currentUser} userProfile={userProfile} />
          </HeaderWrapper>
        }
      />

      <Route
        path="/tournaments"
        element={
          <HeaderWrapper handleLogout={handleLogout} currentUser={currentUser} userProfile={userProfile}>
            <AllTournamentList currentUser={currentUser} />
          </HeaderWrapper>
        }
      />
      
      <Route
        path="/tournament/scorecard/:tournamentId/:round"
        element={
          <HeaderWrapper handleLogout={handleLogout} currentUser={currentUser} userProfile={userProfile}>
            <Scorecard currentUser={currentUser} />
          </HeaderWrapper>
        }
      />

      <Route
        path='/tournament/new'
        element={
          <HeaderWrapper handleLogout={handleLogout} currentUser={currentUser} userProfile={userProfile}>
            <TournamentForm 
              currentUser={currentUser} userProfile={userProfile}
            />
          </HeaderWrapper>
        }
      />

      <Route
        path='/tournament/:id'
        element={
          <HeaderWrapper handleLogout={handleLogout} currentUser={currentUser} userProfile={userProfile}>
            <Tournament currentUser={currentUser}/>
          </HeaderWrapper>
        }
      />
    </Routes>
  </Router>
  )
}

export default App;
