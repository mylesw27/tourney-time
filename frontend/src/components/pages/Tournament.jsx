import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function Tournament () {
    const [tournament, setTournament] = useState({})
    const [players, setPlayers] = useState([])
    const { id } = useParams()

    useEffect (() => {
        const url = `http://localhost:8000/api/tournaments/${id}/`
        axios.get(url)
            .then((response) => {
                console.log(response.data)
                setTournament(response.data)
                setPlayers(response.data.players)
            })
    }, [])

    const datify = (dateString) => {
        if (dateString) {
            console.log(dateString)
            const date = new Date(dateString)
            const dateFormatted = date.toLocaleDateString()
            return dateFormatted
        }
        
    }

    let date1 = datify(tournament?.date1)
    let date2 = datify(tournament?.date2)
    let date3 = datify(tournament?.date3)
    let date4 = datify(tournament?.date4)

    return (
        <>
            <h1>{tournament.name}</h1>
            <p>{date1}</p>
            <p>{tournament.course1}</p>
            <p>{date2}</p>
            <p>{tournament.course2}</p>
            <p>{date3}</p>
            <p>{tournament.course3}</p>
            <p>{date4}</p>
            <p>{tournament.course4}</p>
            <h2>Players</h2>
            {players.map((player) => {
                return (
                    <h3>{`${player.first_name} ${player.last_name}`}</h3>
                )
            })}
        </>
    )
}