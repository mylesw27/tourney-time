import axios from "axios"
import { useState } from "react"
import API from '../../API.js'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        const user = {
            username: username,
            password: password
        }
        const {data} = await API.post('token/', 
            user,
            {headers: {'Content-Type': 'application/json'}, 
            })
        console.log(data)
        localStorage.clear()
        localStorage.setItem('access_token', data.access)
        localStorage.setItem('refresh_token', data.refresh)
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`
        window.location.href = '/profile'

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    placeholder="Enter Username"
                    name='username'
                    type='text'
                    value={username}
                    required
                    onChange={e => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input 
                    placeholder="Enter password"
                    name='password'
                    type='text'
                    value={password}
                    required
                    onChange={e => setPassword(e.target.value)}
                />
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}