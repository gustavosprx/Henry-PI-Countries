import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { countryByName } from "../../redux/actions";

const Search = ({ setInput, setPagina }) => {

  const dispatch = useDispatch()

  const [name, setName] = useState("")

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSumit() {
    dispatch(countryByName(name));
    setName("");
    setInput(1);
    setPagina(1);
  }

  return (
    <div className='search'>
      <input
        className='search-input'
        type="search"
        name="search"
        value={name}
        onChange={(e) => handleChange(e)}
        placeholder="Buscar país"
      />
      <button className="search-btn"  onClick={ handleSumit}>
        <img src="https://cdn-icons-png.flaticon.com/512/483/483356.png" alt="Icono de lupa" />
      </button>
    </div>)
}

export default Search;