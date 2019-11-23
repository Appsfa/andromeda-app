import React from 'react';
import Navigation from './navigation';
import {Link} from 'react-router-dom';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const axios = require('axios');

// import './App.css';

class MyCompDest extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      flights: [],
    };

  }

  componentDidMount(){
    let currentComponent = this;

    const {match: {params}} = this.props;
    axios.get(`https://andromeda-api-buscabar.herokuapp.com/flights/planets/${params.idPlanet}`)
      .then(function (response) {
        // handle success
        console.log(response);
        let flights = response.data.flight.map((flight) => {
          return(
            <Link to={`/${flight._id}/class`} class="col-12 text-center border-bottom border-secondary py-2 text-black" style={{borderWidth: "0.3px"}}>
              <h4>{flight.idSpaceship} - {flight.arrivalPlanet}</h4>
            </Link>
          )
        })
        currentComponent.setState({flights: flights});
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

    render() {
        return (

          <div class="w-100">
            <header>
              <Navigation/>
            </header>
            <main class="container-fluid">
              <div class="row">
                <div class="col-12 col-sm-12 col-md-1 col-lg-2 col-xl-3">

                </div>

                <div class="col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6 pt-4">
                  <div class="row">
                    <div class="col-12 mb-4">
                      <h2><b>Vuelos</b></h2>
                    </div>
                    {this.state.flights}
                  </div>
                </div>

                <div class="col-12 col-sm-12 col-md-1 col-lg-2 col-xl-3">

                </div>
              </div>
            </main>
          </div>
      )
    }

}
export default MyCompDest;
