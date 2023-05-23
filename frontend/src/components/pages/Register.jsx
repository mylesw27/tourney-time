import { useState } from "react"
import API from "../../API"

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async e => {
        e.preventDefault()
        const user = {
            username: username,
            password: password
        }
        const response = await API.post('register/', user)
        console.log(response.data)
        localStorage.clear()
        localStorage.setItem('access_token', response.data.access)
        localStorage.setItem('refresh_token', response.data.refresh)
        console.log(localStorage)
        window.location.href = '/profile'

    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
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