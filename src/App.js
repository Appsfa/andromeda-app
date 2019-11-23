import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from "jquery";
// import { Route, Switch } from "react-router-dom";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Start from './components/start';
import States from './components/states';
import Stations from './components/stations';
import Destination from './components/destination';
import Home from './components/index';
import Login from './components/login';
import Flights from './components/flights';
import Clase from './components/classes';
import Tickets from './components/tickets';

import Dashboard from './components/dashboard/index';
import Countries from './components/dashboard/countries/index';
import Country from './components/dashboard/countries/country';
import Planets from './components/dashboard/planets/index';
import Classes from './components/dashboard/classes/index';
import Status from './components/dashboard/status/index';
import Spaceships from './components/dashboard/spaceships/index';
import Spaceship from './components/dashboard/spaceships/spaceships';
import AdditionalService from './components/dashboard/additional_service/index';
import Benefits from './components/dashboard/benefits/index';
import Dashboard_Flights from './components/dashboard/flights/index';



const App = () => (
  <BrowserRouter>
    <Route exact path="/:idFlight/class" component={Clase} />
    <Route exact path="/states/:idCountry" component={States} />
    <Route exact path="/stations/:idState" component={Stations} />
    <Route exact path="/:idStation/destinations" component={Destination} />
    <Route exact path="/flights/:idStation/:idPlanet" component={Flights} />

    <Route path="/home" component={Home} />
    <Route path="/start" component={Start} />
    <Route path="/login" component={Login} />
    <Route path="/tickets" component={Tickets} />

    <Route exact path="/dashboard/flights" component={Dashboard_Flights} />
    <Route exact path="/dashboard/benefits" component={Benefits} />
    <Route exact path="/dashboard/spaceships" component={Spaceships} />
    <Route exact path="/dashboard/spaceships/:idSpaceship" component={Spaceship} />
    <Route exact path="/dashboard/additional_service" component={AdditionalService} />
    <Route exact path="/dashboard/status" component={Status} />
    <Route exact path="/dashboard/classes" component={Classes} />
    <Route exact path="/dashboard/planets" component={Planets} />
    <Route exact path="/dashboard/countries/:topicId" component={Country} />
    <Route exact path="/dashboard/countries" component={Countries} />
    <Route exact path="/dashboard" component={Dashboard} />
  </BrowserRouter>
);

export default App;
