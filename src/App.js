import React from 'react';
// import { Route, Switch } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import background from './media/img/andromeda-background.jpg';
import logo from './media/img/andromeda.png';
import './App.css';

function App() {
  return (

    <main class="bg-center d-flex align-items-center" style={{backgroundImage: `url(${background})`, height: `${window.innerHeight}px`}}>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 text-center text-white">
            <img src={logo} width="20%" class="mb-3"/>
            <h1 class="text-uppercase font-space-age">Andromeda</h1>
            <h5 class="mb-4">Que la fuerza te acompañe</h5>
            <button class="btn btn-lg rounded-pill btn-light" type="button">Empezar viaje</button>
          </div>
        </div>
      </div>
    </main>
  );
}



export default App;
