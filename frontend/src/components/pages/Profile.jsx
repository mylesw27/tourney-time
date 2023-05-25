import axios from "axios";
import { useState, useEffect } from "react";
import API from "../../API";
import TournamentList from "./TournamentList.jsx"

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
        <>
            <p>player image</p>
            <h1>{profile.first_name}</h1>
            <p>Edit Profile</p>
            <h2>Tournaments</h2>
            {currentUser ? <TournamentList currentUser={currentUser}/> : null }
        </>
    )
}