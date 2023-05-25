import axios from "axios";
import { useState, useEffect } from "react";
import API from "../../API";
import TournamentList from "./TournamentList.jsx"
import './Profile.css'
import { Pencil, PencilFill } from 'react-bootstrap-icons'
import { Link } from "react-router-dom";

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
                <Link to='/profile/edit'><Pencil className="pencil" /></Link>
            </div>
            <h2>My Tournaments</h2>
            {currentUser ? <TournamentList currentUser={currentUser}/> : null }
        </div>
    )
}