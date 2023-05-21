import { useState } from "react";
import { Link } from "react-router-dom";

export default function TournamentsCard(props) {
    const tournament = props.tournament
    console.log(tournament)



    return (
        <>
            <Link to={`/tournament/${tournament.id}`}>
                <h2>{tournament.name}</h2>
                <div className="date">
                    <p>{tournament.date1}</p>
                    <p>{tournament.course1}</p>
                </div>
                <div className="date">
                    <p>{tournament.date2}</p>
                    <p>{tournament.course2}</p>
                </div>
                <div className="date">
                    <p>{tournament.date3}</p>
                    <p>{tournament.course3}</p>
                </div>
                <div className="date">
                    <p>{tournament.date4}</p>
                    <p>{tournament.course4}</p>
                </div>
            </Link>
        </>
    )
}