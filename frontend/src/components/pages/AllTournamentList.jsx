import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios, { all } from "axios";
import TournamentsCard from "../partials/TournamentsCard";
import { Button, Form } from "react-bootstrap";
import './AllTournamentList.css'

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

    return (
        <div className="allTournaments">
            <Link to='/tournament/new'><Button variant="success" className="createButton">Create Tournament</Button></Link>
            <div>
            <div>
            <Form.Label htmlFor="search" >Filter:</Form.Label> 
            </div>
            <Form.Control 
                id="search"
                type="text"
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="filter"
            />
            
            {tournaments[0] != "" ? 
            filterTournamentsMap
            :
            null }
            </div>
        </div>
    )

}