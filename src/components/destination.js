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
      planets: [],
      date: Date()
    };

    // this.componentDidMount.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  setDate(date){
    console.log(date);
    this.setState({date: date});
  }

  componentDidMount(){
    let currentComponent = this;

    const {match: {params}} = this.props;
    axios.get(`https://andromeda-api-buscabar.herokuapp.com/planets`)
      .then(function (response) {
        // handle success
        console.log(response);
        let planets = response.data.planet.map((planet) => {
          return(
            <Link to={`/flights/${params.idStation}/${planet.name}/`} class="col-12 text-center border-bottom border-secondary py-2 text-black" style={{borderWidth: "0.3px"}}>
              <h4>{planet.name} <span class="text-danger">{!planet.goBack ? "*" : ""}</span></h4>
            </Link>
          )
        })
        currentComponent.setState({planets: planets});
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
                      <h2><b>Destinos</b></h2>
                    </div>
                    {this.state.planets}
                    <div class="mx-auto">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker value={this.state.date} onChange={this.setDate} variant="static" orientation="landscape" />
                    </MuiPickersUtilsProvider>
                    </div>
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
