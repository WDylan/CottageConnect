import React from 'react'

const CottageName = ({nextStep, prevStep, handleChange, values, categories}) => {
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
            <label>Nom du logement
              <input 
                type="text" 
                placeholder="Nom du logement" 
                value={values.name} 
                onChange={handleChange('name')}
              />
            </label>
            <label>Description du logement
              <input 
                type="text" 
                placeholder="Une description de votre logement" 
                value={values.content} 
                onChange={handleChange('content')}
              />
            </label>
            <label>
              Choix d'une catégorie
              <select
                name="categorie"
                onChange={handleChange('id_categories')}
                value={values.id_categories}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            </div>
            <button onClick={ Previous }>Précedent</button>
            <button onClick={ Continue }>Suivant</button>
          </div>
        )
      }
      
      export default CottageName
