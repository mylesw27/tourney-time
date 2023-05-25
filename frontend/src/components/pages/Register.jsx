import { useState } from "react"
import API from "../../API"
import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Register(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [lastStep, setLastStep] = useState(props.lastStep)
    const [email, setEmail] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [userId, setUserId] = useState(0)

    const handleRegister = async e => {
        e.preventDefault()
        setErrorMessage(null)
        setMessage(null)
        if (password == confirmPassword){
            const user = {
                username: username,
                password: password,
            }
            try {const response = await API.post('register/', user)
            console.log(response.data)
            localStorage.clear()
            localStorage.setItem('access_token', response.data.access)
            localStorage.setItem('refresh_token', response.data.refresh)
            console.log(localStorage)
            setLastStep(true)
            setUserId(response.data.user)
            } catch(err){
                if(err.response.status == 500){
                    setErrorMessage('That username is already taken')
                }
                console.log(err)
            }
        } else {
            setMessage("Passwords do not match.")
        }
        
    }

    const handleFinishRegister = async e => {
        e.preventDefault()
        const profile = {
            username: username,
            email: email,
            first_name: first_name,
            last_name: last_name
        }
        try {
            const response = await API.put(`/api/users/${userId}/`, profile)
            console.log(response)
            window.location.href = '/profile'
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <>
            {!lastStep ?
            <Form onSubmit={handleRegister}>
                
                <Form.Group>
                    {errorMessage ? <p className="message">{errorMessage}</p> : null }
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control
                        placeholder="Enter Username"
                        name='username'
                        type='text'
                        value={username}
                        required
                        onChange={e => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control 
                        placeholder="Enter password"
                        name='password'
                        type='password'
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)}
                        />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
                    <Form.Control 
                        placeholder="Confirm password"
                        name='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        required
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                        <p className="message">{message}</p>
                </Form.Group>
                <Button type='submit' variant="success" className="submitButton">Submit</Button>
            </Form>
            :
            <Form onSubmit={handleFinishRegister}>
                <h3>Almost there...</h3>
                    <Form.Text className="text-muted"> This is for golf tournament purposes only. We will never share this information with anyone else.</Form.Text>
                <Form.Group>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                        placeholder="Enter email"
                        name='email'
                        type='text'
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="first_name">First Name</Form.Label>
                    <Form.Control 
                        placeholder="Enter first name"
                        name='first_name'
                        type='text'
                        value={first_name}
                        required
                        onChange={e => setFirstName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="last_name">Last Name</Form.Label>
                    <Form.Control 
                        placeholder="Enter last name"
                        name='last_name'
                        type='text'
                        value={last_name}
                        required
                        onChange={e => setLastName(e.target.value)}
                    />
                </Form.Group>
                <Button type='submit' variant="success" className="submitButton">Submit</Button>
                <Link to="/profile" className="skip">Skip this step</Link>
            </Form>
            }
        </>
    )
}