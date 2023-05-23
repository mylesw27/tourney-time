import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"

export default function Tournament () {
    const [tournament, setTournament] = useState({})
    const [players, setPlayers] = useState([])
    const [scores, setScores] = useState([])
    const [roundScores, setRoundScores] = useState([])
    const { id } = useParams()

    useEffect (() => {
        const url = `http://localhost:8000/api/tournaments/${id}/`
        axios.get(url)
            .then((response) => {
                setTournament(response.data)
                setPlayers(response.data.players)
                setScores(response.data.scores)
                console.log(response.data)
            })
    }, [])

    useEffect(() => {
        console.log(hashScores(scores))
        hashScores(scores)
    }, [tournament])

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



    const hashScores = ((scores) => {
        let round1 = {}
        let round2 = {}
        let round3 = {}
        let round4 = {}
        let total = {}
        for (const score of scores) {
            let user = score.user
            let round = score.round
            let sum = score.hole1 + score.hole2 + score.hole2 + score.hole3 + score.hole4 + score.hole5 + score.hole6 + score.hole6 + score.hole7 + score.hole8 + score.hole9 + score.hole10 + score.hole11 + score.hole12 + score.hole13 + score.hole14 + score.hole15 + score.hole16 + score.hole17 + score.hole18
            if (round == 1) {
                round1[user] = sum
            } else if (round == 2) {
                round2[user] = sum
            } else if (round == 3) {
                round3[user] = sum
            } else if (round == 4) {
                round4[user] = sum
            }
        }
        
        setRoundScores([round1, round2, round3, round4])
    })
    console.log(roundScores)

    return (
        <>
            <h1>{tournament.name}</h1>
            <p>{date1} - {tournament.course1}</p>
            {date2 ? <p>{date2} - {tournament.course2}</p> : null}
            {date3 ? <p>{date3} - {tournament.course3}</p> : null}
            {date4 ? <p>{date4} - {tournament.course4}</p> : null}
            <Link to={`/tournament/${tournament.id}/leaderboard`}><button>Live Leaderboard</button></Link>
            <Link to={`/tournament/scorecard/`}><button>My Scorecard</button></Link>
            <h2>Scores</h2>
            <table>
                <th>Player</th>
                <th>{date1 ? 'Round 1' : null}</th>
                <th>{date2 ? 'Round 2' : null}</th>
                <th>{date3 ? 'Round 3' : null}</th>
                <th>{date4 ? 'Round 4' : null}</th>
                <th>Total</th>
                {players.map((player, i) => {
                    let id = player.id
                    return (
                        <tr key={`${id}-${i}`}>
                            <td>{`${player.first_name} ${player.last_name}`}</td>
                            <td>{roundScores[0][id]}</td> 
                            <td>{roundScores[1][id]}</td> 
                            <td>{roundScores[2][id]}</td> 
                            <td>{roundScores[3][id]}</td> 
                            <td>{(roundScores[0][id] ? parseInt(roundScores[0][id]) : 0) + (roundScores[1][id] ? parseInt(roundScores[1][id]) : 0) + (roundScores[2][id] ? parseInt(roundScores[2][id]) : 0) + (roundScores[3][id] ? parseInt(roundScores[3][id]): 0)}
                            </td>
                        </tr>
                    )
                })}

            </table>
        </>
    )
}