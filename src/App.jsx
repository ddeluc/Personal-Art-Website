import React, { useState, } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  Navbar,
  Noh,
  Marble,
  Landing,
  About,
  Contact,
  Work,
} from './components';

const App = () => {
  const [onLanding, setOnLanding] = useState(true);

  if (onLanding) {
    return (
      <>
        <Landing setOnLanding={setOnLanding}/>
      </>
    )
  } else {
    return (
      <BrowserRouter>
        <div className='relative z-0 bg-primary'>
          {/* <div className='bg-hero-pattern bg-cover bg-no-repeat'>
            <Navbar />
            <Noh />
          </div> */}
          <Navbar />
          <Noh />
          <Marble />
          <About />
          <Work />          
          <Contact />
        </div>
      </BrowserRouter>
    )
  } 
}

export default App
