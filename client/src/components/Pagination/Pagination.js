import React,{useState} from "react";
// import style from "./Paginacion.module.css";
// import atras from "./atras-01.png";
// import adelante from "./adelante-01.png";

function Paginacion({ setInput,input,pagina, setPagina, maximo }) {
// const [input,setInput] = useState(1)

const nextPage = () => {
    setInput(parseInt(input)+1)
    setPagina(pagina+1)

}

const previousPage = () => {
    setInput(parseInt(input)-1)
    setPagina(pagina-1)
}

const handleInput = (e) => {
    if (e.keyCode === 13) {
        setPagina (parseInt (e.target.value));
        if (
          parseInt (e.target.value < 1) ||
          parseInt (e.target.value) > Math.ceil(maximo) ||
          isNaN (parseInt(e.target.value))
        ) {
          setPagina(1);
          setInput(1);
        } else {
          setPagina (parseInt(e.target.value));
        }
      }
}

const onChange = (e) => {
    setInput(e.target.value)
}

    return (
        <div className="paginationContainer">
            <button disabled={pagina ===1 || pagina < 1}onClick={previousPage} className="previousPage"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.16 7.41L10.58 12L15.16 16.59L13.75 18L7.75 12L13.75 6L15.16 7.41Z" fill="#C4CDD5" />
            </svg>
            </button>
            <input
            onChange={e => onChange(e)}
                onKeyDown={e => handleInput(e)}
                className="paginationInput"
                value={input}
                autoComplete="off"
                type="number}{-."
            />
            <p>de {Math.ceil(maximo)}</p>
            <button disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)} onClick={nextPage} className="nextPage"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.84 7.41L13.42 12L8.84 16.59L10.25 18L16.25 12L10.25 6L8.84 7.41Z" fill="#C4CDD5" />
            </svg>
            </button>
        </div>
    );
}

export default Paginacion;