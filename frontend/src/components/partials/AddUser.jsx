import API from "../../API"
import { useState, useEffect } from "react"

export default function AddUser(props) {
    const user = props.user
    const tournament = props.tournament
    const playerIdArray = props.playerIdArray
    const [players, setPlayers] = useState(props.players)
    let [isPlaying, setIsPlaying] = useState(false)
    const allPlayers = props.allPlayersFilter
    const [findPlayerId, setFindPlayerId] = useState(null)

    

    useEffect(() => {
        if (playerIdArray.includes(user.id)) {
            setIsPlaying(true)
            allPlayers.forEach(player => {
                if (player.player.id == user.id){
                    setFindPlayerId(player.id)
                }
            });
        }

    }, [])

    const handleAddPlayer = () => {
        
        console.log("submit:", {'player': user.id, 'tournament': tournament} )
        API.post('/api/player_post/', {'player': user.id, 'tournament': tournament})
        .then((response) => {
            console.log(response)
        })
        setIsPlaying(true)
        setPlayers(...players, user)
    }

    const handleRemovePlayer = () => {
        
        console.log("submit:", {'player': user.id, 'tournament': tournament} )
        API.delete(`/api/player_post/${findPlayerId}`)
        .then((response) => {
            console.log(response)
        })
        setIsPlaying(false)
        setPlayers(...players, user)
    }

    return (
        <li>
            <p>{user.username}</p>
            {isPlaying ? <button onClick={handleRemovePlayer}>-</button> : <button onClick={handleAddPlayer}>+</button>}
        </li>
    )
}