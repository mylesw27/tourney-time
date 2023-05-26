import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import API from "../../API";

export default function EditProfile(props) {
    const [currentUser, setCurrentUser] = useState(0)
    const [userProfile, setUserProfile] = useState({})
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [userId, setUserId] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        setCurrentUser(props.currentUser)
        setUserProfile(props.userProfile)
        setUsername(userProfile.username)
        setEmail(userProfile.email)
        setFirstName(userProfile.first_name)
        setLastName(userProfile.last_name)
    }, [currentUser])

    const handleSubmit = async e => {
        e.preventDefault()
        const profile = {
            username: username,
            email: email,
            first_name: first_name,
            last_name: last_name
        }
        try {
            const response = await API.put(`/api/users/${currentUser}/`, profile)
            console.log(response)
            navigate('/profile')
        } catch(err) {
            console.log(err)
        }
    }

    return (
            <Form onSubmit={handleSubmit}>
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
                <Link to="/profile" className="skip">Cancel</Link>
            </Form>
    )
}