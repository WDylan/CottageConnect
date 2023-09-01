import React from 'react'

const CottageConfirm = ({ prevStep, values, handleSubmit}) => {
    const Previous = e => {
        e.preventDefault();
        prevStep();
      }
      return (
        <div>
             <p>
                Confirmer votre cottages et passer a l'ajout de photo
            </p>
            <p>Nom : {values.name}</p>
            <p>Description : {values.content}</p>
            <p>Prix par jour : {values.dayprice}€ </p>
            <p>Caution : {values.caution} €</p>
            {console.log(values)}
          <button onClick={ Previous }>Précedent</button>
          <button onClick={ handleSubmit }>Envoyer</button>
        </div>
      )
}

export default CottageConfirm