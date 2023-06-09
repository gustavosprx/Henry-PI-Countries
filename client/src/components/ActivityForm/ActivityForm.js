import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
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

  const { countries } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(allCountries());
      dispatch(sort('asc'));
    };

    fetchData();
  }, [dispatch]);

  const reloadPage = () => {
    window.location.reload();
  };

  const navbar = true;

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

    const { name, difficulty, duration, season, countries } = state;

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

    if (duration.trim() === '') {
      setError("Field cannot be empty");
      setMostrarError(true);
      return;
    } else {
      const durationSplit = duration.split(':');
      const hours = parseInt(durationSplit[0], 10);
      if (hours < 1 || hours > 12) {
        setError("Value must be between 1 and 12 hours");
        setMostrarError(true);
        return;
      }
    }

    dispatch(createActivity(state));
    setState({
      name: "",
      difficulty: 0,
      duration: "",
      season: "",
      countries: [],
    });

    setError("");
    alert("Your activity was successfully created");
    reloadPage();
  }

  return (
    <>
      <Navbar navbar={navbar} />
      <section className="activity-form-container">
        <div className="form-container">
          <h2><b>Create Activity</b></h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-box">
              <label htmlFor="name"><b>Name</b></label>
              <input
                className="input-name"
                placeholder="Activity Name"
                type="text"
                id="name"
                name="name"
                value={state.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-box">
              <label><b>Country</b></label>
              <select
                className="select-country"
                placeholder="Selecciona el o los paises"
                name="countries"
                onChange={handleSelect}
                required
              >
                <option hidden>Choose the countries</option>
                {countries && countries.map((element) => {
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
                        onClick={handleRemove}
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
                {[1, 2, 3, 4, 5].map((difficultyLevel) => (
                  <div className="difficulty" key={difficultyLevel}>
                    <input
                      type="radio"
                      id={difficultyLevel}
                      value={difficultyLevel}
                      name="difficulty"
                      onChange={handleChoose}
                    />
                    <label htmlFor={difficultyLevel}>{difficultyLevel}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="season-box">
              <label><b>Season</b></label>
              <div className="season-option">
                {["Summer", "Autumn", "Winter", "Spring"].map((season) => (
                  <div key={season}>
                    <input
                      type="radio"
                      id={season}
                      value={season}
                      name="season"
                      onChange={handleChoose}
                    />
                    <label htmlFor={season}>{season}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="duration-box">
              <label htmlFor="name"><b>Duration</b></label>
              <div>
                <input
                  className="input-time"
                  name="duration"
                  value={state.duration}
                  type="time"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button className="submit" type="submit">Create</button>

            {mostrarError ? (
              <p style={{ color: "#FFF", textAlign: "center" }}><b>{error}</b></p>
            ) : null}
          </form>
        </div>
      </section>
    </>
  );
};

export default ActivitForm;
