import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function Tournament () {
    const [tournament, setTournament] = useState({})
    const { id } = useParams()

    useEffect (() => {
        const url = `http://localhost:8000/api/tournaments/${id}/`
        axios.get(url)
            .then((response) => {
                console.log(response.data)
                setTournament(response.data)
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
            <h2>{date1}</h2>
            <h2>{tournament.course1}</h2>
            <h2>{date2}</h2>
            <h2>{tournament.course2}</h2>
            <h2>{date3}</h2>
            <h2>{tournament.course3}</h2>
            <h2>{date4}</h2>
            <h2>{tournament.course4}</h2>
        </>
    )
}