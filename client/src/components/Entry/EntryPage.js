import React from 'react';
import { Link } from "react-router-dom";

const EntryPage = () => {

  return ( 
    <div className="entry" >
      <div className='s'>
      <h1 className="entry-h1">¡Welcome to our website!</h1>
      </div> 
      <h2 className="entry-h2">Discover the world! &#x1F30D;</h2>
      <Link to={'/countries'}>
        <button className="entry-btn">Start <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>
      </Link>    
    </div>
  );
}

export default EntryPage;