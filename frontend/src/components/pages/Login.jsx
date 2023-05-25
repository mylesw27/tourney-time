import axios from "axios"
import { useState } from "react"
import API from '../../API.js'
import './Login.css'
import { Button, Form } from "react-bootstrap"

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)

    const handleSubmit = async e => {
        e.preventDefault()
        const user = {
            username: username,
            password: password
        }
        try {
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
        } catch(err) {
            setMessage("Incorrect Login Credentials. Please try again.")
        }

    }

    return (
        <>
            {message ? <p className="message">{message}</p> : null}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="username" >Username</Form.Label>
                    <Form.Control 
                        placeholder="Enter Username"
                        name='username'
                        type='text'
                        value={username}
                        required
                        onChange={e => setUsername(e.target.value)}
                    />

                </Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control 
                    placeholder="Enter password"
                    name='password'
                    type='password'
                    value={password}
                    required
                    onChange={e => setPassword(e.target.value)}
                />
                <Button type='submit' variant='success' className="submitButton">Submit</Button>
            </Form>
        </>
    )
}