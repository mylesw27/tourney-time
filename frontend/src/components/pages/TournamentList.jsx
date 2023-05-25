import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios, { all } from "axios";
import TournamentsCard from "../partials/TournamentsCard";
import { Button } from "react-bootstrap";


export default function TournamentList(props) {
    const [tournaments, setTournaments] = useState(["",""])
    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
        setCurrentUser(props.currentUser)
        axios.get("http://10.0.0.197:8000/api/tournaments/")
            .then((response) => {
                setTournaments(response.data)
            })
    },[])

    useEffect(() => {

    }, [tournaments, currentUser])

    // let filtered = []
    // const tournamentFilter = 
    //         tournaments.filter((tournament) => {
    //         console.log(tournament, currentUser)
    //         return tournament.player.id == currentUser
    //         })

    let tournamentIdArray = []
    const filterTournaments = () => {
        tournaments.forEach(tournament => {
            if (tournament.players) {
                tournament.players.forEach(player => {
                    if (player.id == currentUser) {
                        tournamentIdArray.push(tournament)
                    }
                })
            }
            
        })
    }

    
    filterTournaments()
    console.log(tournamentIdArray)

    return (
        <>
            <Link to='/tournaments/'><Button variant='success'>Add Tournament</Button></Link>
            {tournamentIdArray.map((tournament, i) => {
                return <TournamentsCard key={i} tournament={tournament} />
            })}
        </>
    )

}