import './Home.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../../API';
import Login from './Login'
import Register from './Register';

export default function Index(profile) {
    const [message, setMessage] = useState('');

     useEffect(() => {
         if(localStorage.getItem('access_token') === null){                   
             window.location.href = '/login'
            }
            else{
                (async () => {
                    try {
                        const jwt = await localStorage.getItem('access_token')
                        const {data} = await API.get(   
                            'http://localhost:8000/home/', {
                             headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${jwt}`
                             }}
                           );
             setMessage(data.message);
          } catch (e) {
            console.log('not auth')
          }
         })()};
     }, []);

     console.log(message)
    return (
        <>
            <h1>Tourney Time</h1>
            <h3>{message}</h3>
            <ul className='nav nav-tabs'>
                <li className='nav-item'>Login</li>
                <li className='nav-item'>Register</li>
            </ul>
            <Login />
            <Register />
        </>
    )
}