import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import './TournamentsCard.css'
import CardHeader from "react-bootstrap/esm/CardHeader";

export default function TournamentsCard(props) {
    const tournament = props.tournament


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



    return (
        <Card className="tournamentCard">
            <Link to={`/tournament/${tournament.id}`}>
                <CardHeader>
                    <Card.Title>
                    {tournament.name}
                    </Card.Title>
                </CardHeader>
                <Card.Body>
                <div className="date">
                    <p>{date1} - {tournament.course1}</p>
                </div>
                <div className="date">
                    {tournament.date2 ? <p>{date2} - {tournament.course2}</p> : null }
                </div>
                <div className="date">
                    {tournament.date3 ? <p>{date3} - {tournament.course3}</p> : null }
                </div>
                <div className="date">
                    {tournament.date4 ? <p>{date4} - {tournament.course4}</p> : null }
                </div>
                </Card.Body>
                
            </Link>
        </Card>
    )
}