import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Button, Container } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import logo from '../../assets/tournament_time_logo.png'
import banner from '../../assets/logo_banner_text.png'

export default function Header(props) {
  const [currentUser, setCurrentUser] = useState('')
  const [userProfile] = useState(props.userProfile)
  const handleLogout = props.handleLogout
  
  useEffect(() => {
    setCurrentUser(props.currentUser)
  },[currentUser])
  

  return (
    <Navbar bg='success' expand='lg'>
      <Container fluid>
        <img src={logo} className='headerImg'/>
        <img src={banner} className='banner' />
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <NavbarCollapse id='basic-navbar-nav'>
        <Nav className='me-auto nav-links'>
          { currentUser ?
          <>
            <Nav.Link href='/profile'>Home</Nav.Link>
            <Nav.Link href='/tournaments'>Tournaments</Nav.Link>
            <Nav.Link href='/'><span onClick={handleLogout}>Logout</span></Nav.Link>
          
          </>
          :
          <>
            <Nav.Link to='/'>Home</Nav.Link>
            <Nav.Link to='/tournaments'>Tournaments</Nav.Link>
            <Nav.Link to='/'>Login</Nav.Link>
          </>
          }

        </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  )

}