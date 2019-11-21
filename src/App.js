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
import Home from './components/index';
import Login from './components/login';
import Dashboard from './components/dashboard/index';
import Countries from './components/dashboard/countries/index';
import Country from './components/dashboard/countries/country';
import Planets from './components/dashboard/planets/index';
import Classes from './components/dashboard/classes/index';
import Status from './components/dashboard/status/index';
import Spaceships from './components/dashboard/spaceships/index';


const App = () => (
  <BrowserRouter>
    <Route path="/state" component={States} />
    <Route path="/home" component={Home} />
    <Route path="/start" component={Start} />
    <Route path="/login" component={Login} />
    <Route exact path="/dashboard/spaceships" component={Spaceships} />
    <Route exact path="/dashboard/status" component={Status} />
    <Route exact path="/dashboard/classes" component={Classes} />
    <Route exact path="/dashboard/planets" component={Planets} />
    <Route exact path="/dashboard/countries/:topicId" component={Country} />
    <Route exact path="/dashboard/countries" component={Countries} />
    <Route exact path="/dashboard" component={Dashboard} />
  </BrowserRouter>
);

export default App;
