import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios, { all } from "axios";
import TournamentsCard from "../partials/TournamentsCard";
import { Button, Form } from "react-bootstrap";

export default function TournamentList(props) {
    const [tournaments, setTournaments] = useState(["",""])
    const [currentUser, setCurrentUser] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
        setCurrentUser(props.currentUser)
        axios.get("http://10.0.0.197:8000/api/tournaments/")
            .then((response) => {
                setTournaments(response.data)
            })
    },[])

    useEffect(() => {

    }, [tournaments, currentUser])

    const filterTournaments = tournaments.filter((tournament) => {
        if(tournament.name) {
            console.log(tournament.name.toLowerCase().includes(search.toLowerCase()))
            return tournament.name.toLowerCase().includes(search.toLowerCase())
        }
    })

    const filterTournamentsMap = filterTournaments.map((tournament, i) => {
        return <TournamentsCard key={i} tournament={tournament} />
    })
    
    console.log(tournaments)

    return (
        <>
            <Link to='/tournament/new'><Button>Create Tournament</Button></Link>
            <Form.Label htmlFor="search">Filter:</Form.Label> 
            <Form.Control 
                id="search"
                type="text"
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
            />
            {tournaments[0] != "" ? 
            filterTournamentsMap
            :
            null }
            {tournaments[0].name ? <p>yep</p>  : <p>nope</p> }
        </>
    )

}