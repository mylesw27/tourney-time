import API from "../../API"

export default function AddUser(props) {
    const user = props.user
    const tournament = props.tournament

    

    const handleAddPlayer = () => {
        
        console.log("submit:", {'player': user.id, 'tournament': tournament} )
        API.post('/api/player_post/', {'player': user.id, 'tournament': tournament})
        .then((response) => {
            console.log(response)
        })
    }

    return (
        <li>
            <p>{user.username}</p>
            <button onClick={handleAddPlayer}>+</button>
        </li>
    )
}