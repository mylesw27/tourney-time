import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

export default function Header(props) {
  const [currentUser, setCurrentUser] = useState('')
  const [userProfile] = useState(props.userProfile)
  const handleLogout = props.handleLogout
  
  useEffect(() => {
    setCurrentUser(props.currentUser)
  },[currentUser])
  

  return (
    <Navbar bg='success' expand='lg'>
      <div>
        { currentUser ?
        <>
          <Link to='/profile'>Home</Link>
          <Link to='/tournaments'>Tournaments</Link>
          <Link to='/'><span onClick={handleLogout}>Logout</span></Link>
          <img src='./tournament_time_logo.png' />
        </>
        :
        <>
          <Link to='/'>Home</Link>
          <Link to='/tournaments'>Tournaments</Link>
          <Link to='/'>Login</Link>
          <img src='./tournament_time_logo.png' className='headerImg'/>
        </>
        }
      </div>
    </Navbar>
  )

}