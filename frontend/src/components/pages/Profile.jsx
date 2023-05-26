import axios from "axios";
import { useState, useEffect } from "react";
import API from "../../API";
import TournamentList from "./TournamentList.jsx"
import './Profile.css'
import { Pencil, PencilFill } from 'react-bootstrap-icons'
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Profile(props) {
    const [currentUser, setCurrentUser] = useState('')
    const [profile, setProfile] = useState({})
    const [tournaments, setTournaments] = useState([])

    useEffect(() => {
        setCurrentUser(props.currentUser)
        const getProfile = async () => {
            if (currentUser) {
                const findProfile = await API.get(`/api/users/${currentUser}`)
                setProfile(findProfile.data)
            }
        }
        getProfile()
        const getTournaments = async () => {
            if (currentUser) {
                const findTournaments = await API.get(`api/tournaments/`)
                setTournaments(findTournaments.data)
            } 
        }
        getTournaments()
    }, [currentUser])

    useEffect(() => {

    }, [currentUser])

    return (
        <div className="profileDiv">
            <div className="nameDiv">
                <h1>{profile.first_name} {profile.last_name}</h1>
                <Link to='/edit/profile'><Pencil className="pencil" /></Link>
            </div>
            <p className="username"><i>{profile.username}</i></p>
            <div className="tournaments">
                <h4 className="tournamentHeader">My Tournaments</h4>
                <Link to='/tournaments/'><Button variant='success' className="addTourney">Add Tournament</Button></Link>
            </div>
            
            {currentUser ? <TournamentList currentUser={currentUser}/> : null }
        </div>
    )
}