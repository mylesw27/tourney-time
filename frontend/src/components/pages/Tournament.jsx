import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import API from '../../API'
import AddUser from "../partials/AddUser"

export default function Tournament (props) {
    const [tournament, setTournament] = useState({})
    const currentUser = props.currentUser
    const [players, setPlayers] = useState([])
    const [scores, setScores] = useState([])
    const [roundScores, setRoundScores] = useState([])
    const { id } = useParams()
    const [allUsers, setAllUsers] = useState([])
    const [addMode, setAddMode] = useState(false)
    const [userSearch, setUserSearch] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])
    const [allPlayers, setAllPlayers] = useState([])
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect (() => {
        const url = `http://10.0.0.197:8000/api/tournaments/${id}/`
        axios.get(url)
            .then((response) => {
                setTournament(response.data)
                setPlayers(response.data.players)
                setScores(response.data.scores)
            })
        axios.get('http://10.0.0.197:8000/api/players/')
            .then((response) => {
                setAllPlayers(response.data)
            })
    }, [])


    const userCheck = () => {
        console.log(playerIdArray, currentUser)
        if (playerIdArray.includes(currentUser)) {
            setIsPlaying(true)
        }
    }


    useEffect(() => {
        if (currentUser) {
            userCheck()
        }
    }, [players])

    useEffect(() => {
        hashScores(scores)
    }, [tournament])

    useEffect(() => {
    }, [userSearch])

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

    const handleAddMode = () => {
        if (!addMode) {
        const getAllUsers = async () => {
            const findUsers = await API.get('/api/users/')
            console.log(findUsers)
            setAllUsers(findUsers.data)
        }
        getAllUsers()
        setAddMode(true)
    } else {
        setAddMode(false)
    }
    }

    let playerIdArray = players.map((player) => {
        return player.id
    })

    const filterUsers = allUsers.filter((user) => {
        return user.username.toLowerCase().includes(userSearch.toLowerCase())
    })

    const allPlayersFilter = allPlayers.filter((player) => {
        return player.tournament == tournament.id
    })

    return (
        <>
            <h1>{tournament.name}</h1>
            <p>{date1} - {tournament.course1}</p>
            {date2 ? <p>{date2} - {tournament.course2}</p> : null}
            {date3 ? <p>{date3} - {tournament.course3}</p> : null}
            {date4 ? <p>{date4} - {tournament.course4}</p> : null}
            <Link to={`/tournament/${tournament.id}/leaderboard`}><button>Live Leaderboard</button></Link>
            {isPlaying ? 
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">My Scorecard</button>
                    <ul className="dropdown-menu">
                        <li><Link to='/tournament/scorecard/9/1' className="dropdown-item" href="#">Round 1</Link></li>
                        {date2 ? <li><Link to='/tournament/scorecard/9/2' className="dropdown-item" href="#">Round 2</Link></li> : null }
                        {date3 ? <li><Link to='/tournament/scorecard/9/3' className="dropdown-item" href="#">Round 3</Link></li> : null }
                        {date4 ? <li><Link to='/tournament/scorecard/9/4' className="dropdown-item" href="#">Round 4</Link></li> : null }
                    </ul>
                </div>
                
                
                : null }
            {tournament.organizer == currentUser? <button onClick={handleAddMode}>Add/Remove Players</button> : null}
            {addMode ? 
                <>
                    <input type="text" id="userSearch" value={userSearch} onChange={(e) => setUserSearch(e.target.value)} /> 
                    <ul>
                        {filterUsers.map((user) => {
                            return <AddUser user={user} tournament={tournament.id} playerIdArray={playerIdArray} players={players} allPlayersFilter={allPlayersFilter}/>
                        })}
                    </ul>    
                </>
            : 
                null 
            }
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