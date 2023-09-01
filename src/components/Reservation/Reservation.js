import React from "react";

function Reservation(props){
    return (
        <li>
            <div>ID de la reservation : {props.id}</div>
            <div>Date de début : {props.date_start}</div>
            <div>Date de fin : {props.date_end}</div>
            <div>Durée de la reservation : {props.duration}</div>
            <div>Nombres de personnes : {props.nombre_personnes}</div>
            <div>Prix total : {props.total}</div>
            <br/>
        </li>
        
    )
}

export default Reservation;