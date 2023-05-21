import { useState, useEffect } from "react";
import axios, { all } from "axios";
import TournamentsCard from "../partials/TournamentsCard";


export default function Tournaments() {
    const [tournaments, setTournaments] = useState(["",""])

    useEffect(() => {
        axios.get("http://localhost:8000/api/tournaments/")
            .then((response) => {
                setTournaments(response.data)
            })
    },[])

    

    return (
        <>
            <h1>Tournaments</h1>
            {tournaments.map((tournament, i) => {
                return <TournamentsCard key={i} tournament={tournament} />
            })}
        </>
    )

}