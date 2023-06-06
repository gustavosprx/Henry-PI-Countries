import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { allCountries, createActivity, sort } from "../../redux/actions";


const ActivitForm = () => {

  const [state, setState] = useState({
    name: "",
    difficulty: 0,
    duration: "",
    season: "",
    countries: [],
  });
  const [error, setError] = useState("");
  const [mostrarError, setMostrarError] = useState(false);
  const [inForm,setInForm] = useState(false)

  const { countries } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(allCountries());
      dispatch(sort('asc'));
      setInForm(true)
    };

    fetchData();
  }, [dispatch]);


  const reloadPage = () => {
    window.location.reload();
  }

  function handleSelect(e) {
    if (state.countries.includes(e.target.value)) {
      console.log("You can not repeat the same country");
    } else {
      setState({
        ...state,
        countries: [...state.countries, e.target.value],
      });
    }
  }

  function handleRemove(e) {
    setState({
      ...state,
      countries: state.countries.filter(
        (country) => country !== e.target.value
      ),
    });
  }

  function handleChoose(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {

    e.preventDefault();

    const { name, difficulty, season, countries } = state;
    if (
      !name.trim() ||
      !/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(name) ||
      name.length <= 3
    ) {
      setError(
        "The name must not contain special characters and must be larger than two"
      );
      setMostrarError(true);
      return;
    }
    if (!name) {
      setError("Compleat this sector whit a name");
      setMostrarError(true);
      return;
    }

    if (!difficulty) {
      setError("You must select a Difficulty level");
      setMostrarError(true);
      return;
    }
    if (!season.trim()) {
      setError("You must select some season of the year");
      setMostrarError(true);
      return;
    }
    if (countries.length < 1) {
      setError("You must select at least one country");
      setMostrarError(true);
      return;
    }
    dispatch(createActivity(state));
    setState({
      name: "",
      difficulty: 0,
      duration: "",
      season: "",
      countries: [],
    });
setError("")
    alert("Your activity was successfully created");
    reloadPage()
  }
  return (
    <>
    <Navbar 
      inForm={inForm}
    />
    <section className="activity-form-container">
      <div className= "form-container">
        <h2><b>Create Activity</b></h2>
         <form className= "form"
          onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="name">
              <b>Name</b>
            </label>
            <input
              className="input-name"
              placeholder="Activity Name"
              type="text"
              id="name"
              name="name"
              value={state.name}
              onChange={(e) => {
                handleChange(e);
              }}
            />

          </div>

          <div className="input-box">
            <label ><b>Country</b></label>
            <select
              className="select-country"
              placeholder="Selecciona el o los paises"
              name="countries"
              onChange={e => handleSelect(e)}
              required
            >
              
              <option hidden>Choose the countries</option>
              {countries && countries.map((element, index) => {
                return (
                  <option value={element.id} key={element.id}>

                    {element.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            {state.countries?.map((country) => {
              return (
                <div className="country-selected" key={Math.random()}>
                  <div>
                  <span>
                      {countries.find((c) => c.id === country).name}
                  </span>
                    <button
                    className="remove-country"
                      value={country}
                      type="button"
                      onClick={(e) => handleRemove(e)}
                    >
                      x
                    </button>
                  </div>
                </div>
              );
            })}
          </div>    


          <div className="difficulty-box">
            <label className="label-d"><b>Difficulty</b></label>
            <div className="difficulty-option">
              <div className="difficulty">
                <input
                  type="radio"
                  id="1"
                  value="1"
                  name="difficulty"
                  onChange={(e) => handleChoose(e)}
                />
                <label htmlFor="1">1</label>
              </div>

              <div className="difficulty">
                <input
                  type="radio"
                  id="2"
                  value="2"
                  name="difficulty"
                  onChange={(e) => handleChoose(e)}
                />
                <label htmlFor="2">2</label>
              </div>

              <div className="difficulty">
                <input
                  type="radio"
                  id="3"
                  value="3"
                  name="difficulty"
                  onChange={(e) => handleChoose(e)}
                />
                <label htmlFor="3">3</label>
              </div>

              <div className="difficulty">
                <input
                  type="radio"
                  id="4"
                  value="4"
                  name="difficulty"
                  onChange={(e) => handleChoose(e)}
                />
                <label htmlFor="4">4</label>
              </div>

              <div className="difficulty">
                <input
                  type="radio"
                  id="5"
                  value="5"
                  name="difficulty"
                  onChange={(e) => handleChoose(e)}
                />
                <label htmlFor="5">5</label>
              </div>
            </div>
          </div>

          <div className="season-box">
            <label><b>Season</b></label>
            <div className="season-option">
              <div>
                <input
                  type="radio"
                  id="Summer"
                  value="Summer"
                  name="season"
                  onChange={(e) => handleChoose(e)}
                />
                <label htmlFor="Summer">Summer </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="Autumn"
                  value="Autumn"
                  name="season"
                  onChange={(e) => handleChoose(e)}

                />
                <label htmlFor="Autumn" >Autumn </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Winter"
                  value="Winter"
                  name="season"
                  onChange={(e) => handleChoose(e)}
                />
                <label htmlFor="Winter">Winter </label>
              </div>

              <div>

                <input

                  type="radio"
                  id="Spring"
                  value="Spring"
                  name="season"
                  onChange={(e) => handleChoose(e)}

                />
                <label htmlFor="Spring">Spring</label>
              </div>

            </div>

          </div>





          <div className="duration-box">
            <label htmlFor="name">
              <b>Duration</b>
            </label>

            <div>
              <input
                className="input-time"
                name="duration"
                value={state.duration}
                type="time"
                min="01:00"
                max="12:00"
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
            </div>
          </div>




          <button className="submit" type="submit">
            Create
          </button>
          {mostrarError?<p style={{color:"#F56B58", textAlign:"center" }}><b>{error}</b></p>:null}
        </form>
      </div > 
    </section >
    </>
  )
}

export default ActivitForm;