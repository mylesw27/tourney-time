import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './components/pages/Home'
import Tournaments from './components/pages/TournamentList.jsx';
import Tournament from './components/pages/Tournament.jsx';

function App() {
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
