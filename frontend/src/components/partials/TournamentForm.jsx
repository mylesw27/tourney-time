import { useEffect, useState } from "react";
import API from '../../API'
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap'

export default function TournamentForm(props) {
    const [currentUser, setCurrentUser] = useState('')
    // const [tournamentName, setTournamentName] = useState('')
    // const [date1, setDate1] = useState('')
    // const [date2, setDate2] = useState('')
    // const [date3, setDate3] = useState('')
    // const [date4, setDate4] = useState('')
    // const [course1, setCourse1] = useState('')
    // const [course2, setCourse2] = useState('')
    // const [course3, setCourse3] = useState('')
    // const [course4, setCourse4] = useState('')
    const [form, setForm] = useState({
        name: '',
        organizer : 0,
        date1: null,
        date2: null,
        date3: null,
        date4: null,
        course1: null,
        course2: null,
        course3: null,
        course4: null,
        players: [],
        scores: [],
    })
    
    const navigate = useNavigate()

    useEffect (() => {
        setCurrentUser(props.currentUser)
        form.organizer = currentUser  
        console.log(currentUser)
    }, [currentUser])

    const submitForm = (e) => {
        e.preventDefault()
        console.log(form)
        const create_tournament = async () => {
            const response = await API.post('/api/tournaments/', form,{headers: {'Content-Type': 'application/json'}})
            console.log(response)
            navigate(`/tournament/${response.data.id}`)
        }
        create_tournament()
    }


    return(
        <>
            <Form onSubmit={submitForm}>
                <Form.Group>
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control 
                        type="text"
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" id="organizer" defaultValue={currentUser} hidden  />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="date1">Round 1 Date:</Form.Label>
                    <Form.Control
                        type="date"
                        id="date1"
                        value={form.date1}
                        onChange={(e) => setForm({...form, date1: e.target.value})}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="date2">Round 2 Date:</Form.Label>
                    <Form.Control
                        type="date"
                        id="date2"
                        value={form.date2}
                        onChange={(e) => setForm({...form, date2: e.target.value})}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="date3">Round 3 Date:</Form.Label>
                    <Form.Control
                        type="date"
                        id="date3"
                        value={form.date3}
                        onChange={(e) => setForm({...form, date3: e.target.value})}
                    />
                </Form.Group>
                <Form.Group> 
                    <Form.Label htmlFor="date4">Round 4 Date:</Form.Label>
                    <Form.Control
                        type="date"
                        id="date4"
                        value={form.date4}
                        onChange={(e) => setForm({...form, date4: e.target.value})}
                    />
                </Form.Group>
                <Form.Group> 
                    <Form.Label htmlFor="course1">Round 1 Course:</Form.Label>
                    <Form.Control
                        type="text"
                        id="course1"
                        value={form.course1}
                        onChange={(e) => setForm({...form, course1: e.target.value})}
                    />
                </Form.Group>
                <Form.Group> 
                    <Form.Label htmlFor="course2">Round 2 Course:</Form.Label>
                    <Form.Control
                        type="text"
                        id="course2"
                        value={form.course2}
                        onChange={(e) => setForm({...form, course2: e.target.value})}
                    />
                </Form.Group>
                <Form.Group> 
                    <Form.Label htmlFor="course3">Round 3 Course:</Form.Label>
                    <Form.Control
                        type="text"
                        id="course3"
                        value={form.course3}
                        onChange={(e) => setForm({...form, course3: e.target.value})}
                    />
                </Form.Group>
                <Form.Group> 
                    <Form.Label htmlFor="course4">Round 3 Course:</Form.Label>
                    <Form.Control
                        type="text"
                        id="course4"
                        value={form.course4}
                        onChange={(e) => setForm({...form, course4: e.target.value})}
                    />
                </Form.Group>
                <Button type="submit" variant="success">Submit</Button>
            </Form>
        </>
    )
}