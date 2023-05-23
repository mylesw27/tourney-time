import './Home.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../../API';
import Login from './Login'
import Register from './Register';

export default function Index(profile) {
    const [message, setMessage] = useState('');

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