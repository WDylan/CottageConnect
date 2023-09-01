import React from 'react'

const CottagePrice =  ({nextStep, prevStep, handleChange, values}) => {
  const Previous = e => {
      e.preventDefault();
      prevStep();
    }
      const Continue = e => {
        e.preventDefault();
        nextStep();
      }
      return (
        <div>
        <div>
          <label>Prix a la nuit
            <input 
              type="text" 
              placeholder="Prix par nuit du logement" 
              value={values.dayprice} 
              onChange={handleChange('dayprice')}
            />
          </label>
          <label>Caution du logement
            <input 
              type="text" 
              placeholder="La caution de votre logement" 
              value={values.caution} 
              onChange={handleChange('caution')}
            />
          </label>
          </div>
          <button onClick={ Previous }>Précedent</button>
          <button onClick={ Continue }>Suivant</button>
        </div>
      )
    }
    

export default CottagePrice