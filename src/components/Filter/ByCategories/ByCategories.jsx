import React, { useContext } from 'react'
import { ResultsContext } from '../../Result/ResultContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ByCategories ({name, id}) {
    const url = './img/'+ name +'.jpg'
    const navigate = useNavigate();
    const { setResults } = useContext(ResultsContext);
    async function handleClick () {
      try {
        const response = await axios.get(`http://localhost:3001/cottages/category/${id}`)
  
        setResults(response.data);
        navigate('/results');
        
      } catch (error) {
        console.log('Error:', error);
      }
  }
  return (
    <div className='mer' onClick={handleClick}>
        <img className="imgFilter" src={url} alt={name} />
        <p>{name}</p>
    </div>
  )
}
