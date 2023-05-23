import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  const [currentUser, setCurrentUser] = useState('')
  const [userProfile] = useState(props.userProfile)
  const handleLogout = props.handleLogout
  
  useEffect(() => {
    setCurrentUser(props.currentUser)
  },[currentUser])


  return (
    <nav className='navbar'>
      <div>
        { currentUser ?
        <>
          <Link to='/profile'>Home</Link>
          <Link to='/tournaments'>Tournaments</Link>
          <Link to='/'><span onClick={handleLogout}>Logout</span></Link>
        </>
        :
        <>
        </>
        }
      </div>
    </nav>
  )

}