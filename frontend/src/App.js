import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tournament, setTournament] = useState({})

  useEffect(() => {
    axios.get("http://localhost:8000/api/tournaments/")
      .then((response) => {
        console.log(response.data)
        setTournament(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  })

  console.log(tournament)
  const handlePostClick = (() => {
    const form = {
      "name":"new tourney",
      "date1": "2023-05-25",
      "course1": "New Course"
    }
    axios.post("http://localhost:8000/api/tournaments/", form)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    })
   
  const handleDeleteClick = (() => {
    axios.delete("http://localhost:8000/api/tournaments/3")
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  })

  return (
    <div className="App">
      <h1>Hello</h1>
      <button onClick={handlePostClick}>Post</button>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}

export default App;
