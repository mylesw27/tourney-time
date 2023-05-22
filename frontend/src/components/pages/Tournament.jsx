import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function Tournament () {
    const [tournament, setTournament] = useState({})
    const [players, setPlayers] = useState([])
    const [scores, setScores] = useState([])
    const { id } = useParams()

    useEffect (() => {
        const url = `http://localhost:8000/api/tournaments/${id}/`
        axios.get(url)
            .then((response) => {
                console.log(response.data)
                setTournament(response.data)
                setPlayers(response.data.players)
                setScores(response.data.scores)
            })
    }, [])

    const datify = (dateString) => {
        if (dateString) {
            const date = new Date(dateString)
            const dateFormatted = date.toLocaleDateString()
            return dateFormatted
        }
        
    }

    let date1 = datify(tournament?.date1)
    let date2 = datify(tournament?.date2)
    let date3 = datify(tournament?.date3)
    let date4 = datify(tournament?.date4)

    const hashScores = (() => {
        let hash = {}
        for (const score of scores) {
            console.log(score.user)
            // if (hash.hasOwnProperty(score.user)){
            //     let sum = score.hole1 + score.hole2 + score.hole3 + score.hole4 + score.hole5 + score.hole6 + score.hole7 + score.hole8 + score.hole9 + score.hole10 + score.hole11 + score.hole12 + score.hole13 + score.hole14 + score.hole15 + score.hole16 + score.hole17 + score.hole18
            //     hash.score.user = hash.score.user + sum
            // } else {
            //     let sum = score.hole1 + score.hole2 + score.hole3 + score.hole4 + score.hole5 + score.hole6 + score.hole7 + score.hole8 + score.hole9 + score.hole10 + score.hole11 + score.hole12 + score.hole13 + score.hole14 + score.hole15 + score.hole16 + score.hole17 + score.hole18
            //     hash = {...hash, hash.score.user: sum  }
            //     console.log(score, "else")
            // }
            // hash = {...hash + newthing}
        }
        // return hash
    })

    console.log(scores)
    hashScores()

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
            {players.map((player, i) => {
                return (
                    <h3 key={`${player.id}-${i}`}>{`${player.first_name} ${player.last_name}`}</h3>
                )
            })}
        </>
    )
}