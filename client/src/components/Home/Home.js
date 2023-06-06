import React, { useEffect, useState } from "react";
import Navbar from '../Navbar/Navbar';
import Card from '../Card/Card';

import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  allCountries,
  clear,
} from "../../redux/actions";


const Home = () => {

  const { countries, allActivity } = useSelector((state) => state);
  

    const [pagina, setPagina] = useState(1);
    const [porPagina,setPorPagina] = useState(10)
    const [input,setInput] = useState(1)
    

  const maximo = countries.length / porPagina

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allCountries());
    setTimeout(function() {

      console.log('Loading...',countries)
    }, 1000);
    dispatch(clear());
    
  }, [dispatch]);

  return (
    <div className="home">
      <Navbar 
        setPagina={setPagina}
        pagina={pagina}
        input={input}
        setInput={setInput}
      />
      
      <h1 className="home-title">Discover the world</h1>
      {countries === 'No se encontro el pais'?<h2>No countries found. Sorry! :(</h2>
      :
      <div className='card-container'>
        {
          countries?.slice((pagina-1) * porPagina,
                            (pagina-1) * porPagina + porPagina
          ).map(element => {
            
            return (                    <Card        
              key={element.id}
                continents={element.continents}
                flagsImage={element.flagsImage}
                id={element.id}
                name={element.name}
                population={element.population}
              />    )
          })
        }
      </div>
      }
      
      <Pagination
                pagina={pagina}
                setPagina={setPagina}
                maximo={maximo}
                setInput={setInput}
                input={input}

              />
    </div>

  );
}

export default Home;