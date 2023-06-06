import React, {useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import {
  countryById,
  deleteActivity
} from '../../redux/actions'


const CardDetail = () => {

  const { detail } = useSelector((state) => state)
  const { id } = useParams()
  const [inDetail, setInDetail] = useState(false)


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(countryById(id))
    setInDetail(true)
  }, [dispatch])

  const handleDelete = (e) => {
    
    const aux = detail.Activities.filter(c=> c.name !== e.name )
    detail.Activities = [...aux]
    dispatch(deleteActivity(detail,e.name))
  }

  return (
    <>
     <Navbar inDetail={inDetail}/> 
    <div className='card-detail-container'>
      <div className="card-detail">
        <h2 className="card-detail-title">{detail.name}</h2>
        <img src={detail.flagsImage} alt="asd" className="card-detail-image" />
        <div className="card-detail-content">
          <p className="card-detail-description"><b>Continent:</b> {detail.continents}</p>
          <p className="card-detail-description"><b>Capital:</b> {detail.capital}</p>
          <p className="card-detail-description"><b>Subregion:</b> {detail.subregion}</p>
          <p className="card-detail-description"><b>Area:</b> {detail.area}km²</p>
          <p className="card-detail-description"><b>Population:</b> {detail.population}</p>
          <p className="card-detail-description"><b>ID:</b> {detail.id}</p>
        </div>
      </div>
      <div className='activity-container'>
          <section >
            <h2 className='activity-container-title'>Activities</h2>
            {detail.Activities?.length > 0 ? detail.Activities?.map((actividad) => {
              return (
                <div className='activity-box' key={Math.random().toString(36).substr(2, 9)}>
                  
                  <h3>{actividad.name}</h3>
                  <p><b>Difficulty: </b>{actividad.difficulty}</p>
                  <p><b>Season: </b>{actividad.season}</p>
                  <p><b>Duration: </b>{actividad.duration}</p>
                  <button className="delete-button"onClick={()=>{handleDelete(actividad)}}>Delete</button>
                </div>

              );
            }):<><p>No Activities</p>
              <Link to={'/activity'}>
                <button className='activity-create'>
                  Create Activity
                </button>
              </Link>          
            </>}           
          </section>
        </div>
    </div>
    </>
  );
}

export default CardDetail;


