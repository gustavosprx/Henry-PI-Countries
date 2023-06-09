import { 
    ALL_COUNTRIES,
    GET_COUNTRY_ID,
     GET_COUNTRY_NAME,
    CREATE_ACTIVITY,
    SORT,
    SORT_POPULATION,
    SORT_CONTINENT,
    SORT_ACTIVITY,
    DELETE_ACTIVITY
  } from "./actions";
  
  const initialState = {
    countries: [],
    detail: [],
    copyCountries: [],
    allActivity: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    
    switch (action.type) {
        
      case ALL_COUNTRIES:
        return {
          ...state,
          countries: action.payload,
          copyCountries: action.payload,
          allActivity: action.payload,
        };
  
      case GET_COUNTRY_NAME:
        console.log('desde country', action.payload)
        return {
          ...state,
          countries: action.payload,
        };
  
      case GET_COUNTRY_ID:
        return {
          ...state,
          detail: action.payload,
        };
       case CREATE_ACTIVITY:
        return {
          ...state,
        };
  
      case SORT:
        if (action.payload === "asc") {
          let countriesAsc = state.countries.sort((a, b) =>
            a.name > b.name ? 1 : a.name < b.name ? -1 : 0
          );
          return {
            ...state,
            countries: countriesAsc,
          };
        } else {
          let countriesDes = state.countries.sort((b, a) =>
            a.name > b.name ? 1 : a.name < b.name ? -1 : 0
          );
          return {
            ...state,
            countries: countriesDes,
          };
        }
      case SORT_POPULATION:
        if (action.payload === "asc") {
          let countriesDes = state.countries.sort((a, b) =>
            a.population > b.population ? 1 : a.population < b.population ? -1 : 0
          );
          return {
            ...state,
            countries: countriesDes,
          };
        } else {
          let countriesAsc = state.countries.sort((b, a) =>
            a.population > b.population ? 1 : a.population < b.population ? -1 : 0
          );
          return {
            ...state,
            countries: countriesAsc,
          };
        }
      case SORT_CONTINENT:
        if (action.payload) {
          let continente =
            action.payload === "todos"
              ? state.copyCountries
              : state.copyCountries.filter(
                  (c) => c.continents === action.payload
                );
          return {
            ...state,
            countries: continente,
          };
        }
        return {
          ...state,
        };

        case CREATE_ACTIVITY:
          return {
            ...state,
            
          };

          case DELETE_ACTIVITY:
            console.log(action.payload)
            console.log()
            return {
              ...state,          
              detail: action.payload
            };
    
  
      case SORT_ACTIVITY:
        let mapeoCountries =
          action.payload === "all"
            ? state.copyCountries.filter(c=> c.Activities.length>0)
            : state.copyCountries.filter((c) => {
                let mapeo = c.Activities?.map((d) => d.name);
                if (mapeo.includes(action.payload)) {
                  return c;
                }
              });
  
        return {
          ...state,
          countries: mapeoCountries,
        };
  
      default:
        return { ...state };
    }
  };
  
  export default rootReducer;