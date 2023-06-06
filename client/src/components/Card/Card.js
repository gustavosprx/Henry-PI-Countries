import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ continents,
  flagsImage,
  id,
  name,
 }) => {
  const navigate= useNavigate()
  const handleOnClick = (id) => {
    navigate(`/countries/${id}`)
  }  
  return (

      <div className="card" onClick={()=>{handleOnClick(id)}}>
      <div className='image-container'>
        <img src={flagsImage} alt={"title"} className="image" />
      </div>

      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        <p className="card-description"><b>Continent: </b> {continents}</p>
      </div>
      <div className='card-footer'>
        <p className='footer-text'>More Infomation</p>
      </div>
    </div>
  );
}

export default Card;
