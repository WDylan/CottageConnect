import React, { useContext } from 'react';
import { ResultsContext } from './ResultContext';
import "./Result.scss";
import { Link } from 'react-router-dom';
import Carousel from '../Carrousel/Carousel2';

const Results = () => {
    const { results } = useContext(ResultsContext);
  return (
    <div className='cottagesDiv'>
      <Carousel show={4}>
      {results.map((cottage, index) => (
        <Link to={`/cottage/${cottage.id}`} className='cottageCard' key={index}>
          <h3>{cottage.name}</h3>
          <p>Présentation: {cottage.content}</p>
          <p>Prix par jour: {cottage.dayprice}</p>
          <p>Caution: {cottage.caution}</p>
          <p>Nombre de fois reserver: {cottage.res_count}</p>
          <p>Max Personnes: {cottage.max_personnes}</p>
            {/*  A FINIR */}
          <p>Category ID: {cottage.id_categories}</p>
          <p>Prestation ID: {cottage.id_prestation}</p>
          <p>Address ID: {cottage.id_adress}</p>
        </Link>
      ))}
      </Carousel>
    </div>
  );
};

export default Results;