import React from "react";
import './Formulaire.scss'

function Formulaire() {
    return (
        <div class="containerForm">
            <h3 className="formTitle">Contactez nous !</h3>
            <div className="inputFormulaires">
                <input className="inputFormulaire" type="text" id="Prenom" placeholder="Prénom" />

                <input className="inputFormulaire" type="text" id="Nom" placeholder="Nom" />

                <input className="inputFormulaire" type="email" placeholder="Votre email" />
            </div>
            <div className="textMessages">
                <textarea className="message" placeholder="Votre message"></textarea>
            </div>
            <div className="buttonSubmits">
                <button className="buttonSubmit" name="button"> Soumettre </button>
            </div>
        </div>
    )
}
export default Formulaire;