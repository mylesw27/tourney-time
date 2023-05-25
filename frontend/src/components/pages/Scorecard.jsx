import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../API";

export default function Scorecard(props) {
    const currentUser = props.currentUser
    const { tournamentId } = useParams()
    const { round } = useParams()
    const [scorecard, setScorecard] = useState({}) 
    const [scoreForm, setScoreForm] = useState({
        tournament: tournamentId,
        round: round, 
        user: `${currentUser}`,
        hole1: 0,
        hole2: 0,
        hole3: 0,
        hole4: 0,
        hole5: 0,
        hole6: 0,
        hole7: 0,
        hole8: 0,
        hole9: 0,
        hole10: 0,
        hole11: 0,
        hole12: 0,
        hole13: 0,
        hole14: 0,
        hole15: 0,
        hole16: 0,
        hole17: 0,
        hole18: 0
    })

    useEffect(() => {
        const requestData = {
            tournament: tournamentId,
            round: round,
            user: `${currentUser}`
        }
        if (currentUser){
            API.post('/api/scores/', requestData)
            .then((response) => {
                setScorecard(response.data)
                setScoreForm(response.data)
                console.log(response.data)
            })
            console.log(requestData)
        }
    }, [currentUser])

    const handleSubmit = (e) => {
        e.preventDefault()
        API.put(`/api/scores/${scorecard.id}/`, scoreForm)
            .then((response) => {
                console.log(response)
            })
    }
    return (
        <>
            <h1>Scorecard</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="hole1">1</label>
                <input type="number" id="hole1" value={scoreForm.hole1} onChange={(e) => setScoreForm({...scoreForm, hole1: e.target.value})}/>
                <label htmlFor="hole2">2</label>
                <input type="number" id="hole2" value={scoreForm.hole2} onChange={(e) => setScoreForm({...scoreForm, hole2: e.target.value})}/>
                <label htmlFor="hole3">3</label>
                <input type="number" id="hole3" value={scoreForm.hole3} onChange={(e) => setScoreForm({...scoreForm, hole3: e.target.value})}/>
                <label htmlFor="hole4">4</label>
                <input type="number" id="hole4" value={scoreForm.hole4} onChange={(e) => setScoreForm({...scoreForm, hole4: e.target.value})}/>
                <label htmlFor="hole5">5</label>
                <input type="number" id="hole5" value={scoreForm.hole5} onChange={(e) => setScoreForm({...scoreForm, hole5: e.target.value})}/>
                <label htmlFor="hole6">6</label>
                <input type="number" id="hole6" value={scoreForm.hole6} onChange={(e) => setScoreForm({...scoreForm, hole6: e.target.value})}/>
                <label htmlFor="hole7">7</label>
                <input type="number" id="hole7" value={scoreForm.hole7} onChange={(e) => setScoreForm({...scoreForm, hole7: e.target.value})}/>
                <label htmlFor="hole8">8</label>
                <input type="number" id="hole8" value={scoreForm.hole8} onChange={(e) => setScoreForm({...scoreForm, hole8: e.target.value})}/>
                <label htmlFor="hole9">9</label>
                <input type="number" id="hole9" value={scoreForm.hole9} onChange={(e) => setScoreForm({...scoreForm, hole9: e.target.value})}/>
                <label htmlFor="hole10">10</label>
                <input type="number" id="hole10" value={scoreForm.hole10} onChange={(e) => setScoreForm({...scoreForm, hole10: e.target.value})}/>
                <label htmlFor="hole11">11</label>
                <input type="number" id="hole11" value={scoreForm.hole11} onChange={(e) => setScoreForm({...scoreForm, hole11: e.target.value})}/>
                <label htmlFor="hole12">12</label>
                <input type="number" id="hole12" value={scoreForm.hole12} onChange={(e) => setScoreForm({...scoreForm, hole12: e.target.value})}/>
                <label htmlFor="hole13">13</label>
                <input type="number" id="hole13" value={scoreForm.hole13} onChange={(e) => setScoreForm({...scoreForm, hole13: e.target.value})}/>
                <label htmlFor="hole14">14</label>
                <input type="number" id="hole14" value={scoreForm.hole14} onChange={(e) => setScoreForm({...scoreForm, hole14: e.target.value})}/>
                <label htmlFor="hole15">15</label>
                <input type="number" id="hole15" value={scoreForm.hole15} onChange={(e) => setScoreForm({...scoreForm, hole15: e.target.value})}/>
                <label htmlFor="hole16">16</label>
                <input type="number" id="hole16" value={scoreForm.hole16} onChange={(e) => setScoreForm({...scoreForm, hole16: e.target.value})}/>
                <label htmlFor="hole17">17</label>
                <input type="number" id="hole17" value={scoreForm.hole17} onChange={(e) => setScoreForm({...scoreForm, hole17: e.target.value})}/>
                <label htmlFor="hole18">18</label>
                <input type="number" id="hole18" value={scoreForm.hole18} onChange={(e) => setScoreForm({...scoreForm, hole18: e.target.value})}/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}