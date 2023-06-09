import React from 'react';
import Search from '../Search/Search';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
  sort,
  sortNumerico,
  sortContinent,
  sortActivity

} from "../../redux/actions"


const Navbar = ({ setPagina,input ,setInput,navbar }) => {

  const { allActivity } = useSelector((state) => state)
  const dispatch = useDispatch()

  let activities = []

  allActivity.forEach(c => {
    // console.log(c)
    if (c.Activities.length > 0) {
      c.Activities.forEach(e => {
        activities.push(e.name)
      })
    }
  })

   const activitiesNoRepeat = [...new Set(activities)];

  const handleSelectAlfabetico = (e) => {
    e.preventDefault();
    dispatch(sort(e.target.value))
    setPagina(1)
    setInput((input = 1))
  }

  const handleSelectPopulation = (e) => {
    e.preventDefault();
    dispatch(sortNumerico(e.target.value));
    setInput((input = 1));
    setPagina(1);
  }

  const handleSelectContinent = (e) => {
    if (e.target.value === "Continents") return
    dispatch(sortContinent(e.target.value));
    setInput((input = 1));
    setPagina(1);
  }

  const handleSelectActivity = (e)=> {
    if (e.target.value === "No activities" || e.target.value === "Activities") return
    dispatch(sortActivity(e.target.value));
    setInput((input = 1));
    setPagina(1);
  }



  

  return (
    <header>
      <a href="/countries" className='header-link'>Countries App</a>
      {navbar ?<Link to="/countries">
          <button className="create-activity-btn" ><b>Go Back</b></button>
        </Link>:(<>
        <Search setInput={setInput} setPagina={setPagina} />
        <nav>
        <ul className='orders'>
          <li><select
            onChange={(e) => handleSelectAlfabetico(e)}
          >
            <option>A-Z &#8645;</option>
            <option value="asc">Ascending </option>
            <option value="des">Descending</option>
          </select>
          </li>

          <li><select
            onChange={(e) => handleSelectPopulation(e)}
          >
            <option>Poblation &#8645;</option>
            <option value="asc">Minor</option>
            <option value="des">Major</option>
          </select>
          </li>
          <li><select
            onChange={(e) => handleSelectContinent(e)}
          >
            <option value={'Continents'}>Continents &#8645;</option>
            <option value="todos">All Continents</option>
            <option value="Africa">Africa</option>
            <option value="South America">South America</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="Oceania">Oceania</option>
          </select>

          </li>
          <li><select
            onChange={(e) => { handleSelectActivity(e) }}
          >
            <option value={"Activities"}>Activities &#8645;</option>
            {activitiesNoRepeat.length === 0 ? <option key={Math.random()} >No activities yet</option> :
              activitiesNoRepeat?.map(activity => {
                console.log(activity)
                return (
                  <option key={Math.random()} value={activity}>{activity}</option>
                )
              })
            }
          </select>
          </li>
        </ul>
      </nav>
      <div>
        <Link to="/activity">
          <button className="create-activity-btn" ><b>Create Activity</b></button>
        </Link>
      </div>
        </>)}
      
      
    </header>
  );
}

export default Navbar;