import React, { useContext } from 'react'
import { ResultsContext } from '../../Result/ResultContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ByCity ({name}) {
    const url = './img/'+ name +'.jpg'

    const navigate = useNavigate();
    const { setResults } = useContext(ResultsContext);
    async function handleClick () {
      const data = {}
      data.date_start = '2000-01-01';
      data.date_end = '2000-01-01';
      data.nombre_personnes = '0';
      console.log(`http://localhost:3001/cottages/cottage/${data.nombre_personnes}/${data.date_start}/${data.date_end}/${name}`);
    try {
      const response = await axios.get(`http://localhost:3001/cottages/cottage/${data.nombre_personnes}/${data.date_start}/${data.date_end}/${name}`)

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
