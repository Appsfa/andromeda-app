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
import $ from 'jquery';

const axios = require('axios');

// import './App.css';

class MyCompDest extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      classes: [],
      idFlight: '',
      className: '',
    };

    this.createTicket = this.createTicket.bind(this);

  }

  createTicket(event){
    // alert('Ticket creado');
    let currentComponent = this;

    console.log($(event.target).attr('data-class'));
    currentComponent.state.className = $(event.target).attr('data-class');

    const {match: {params}} = this.props;

    console.log(currentComponent.state);

    var config = {
      headers: {
        'content-type': 'application/json',
        'token': 'Bearer',
        'authorization': 'bearer ' + window.localStorage.getItem('token')
      }
    };

    axios.post(`https://andromeda-api-buscabar.herokuapp.com/seats`,{
      className: currentComponent.state.className,
      idFlight: currentComponent.state.idFlight,
      username: window.localStorage.getItem('username'),
    }, config)
      .then(function (response) {
        // handle success
        alert('Ticket creado');
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  componentDidMount(){
    let currentComponent = this;

    const {match: {params}} = this.props;
    this.setState({idFlight: params.idFlight});
    axios.get(`https://andromeda-api-buscabar.herokuapp.com/classes`)
      .then(function (response) {
        // handle success
        console.log(response);
        let classes = response.data.class.map((clase) => {
          return(
            <a onClick={currentComponent.createTicket} data-class={clase.className} class="col-12 text-center border-bottom border-secondary py-2 text-black" style={{borderWidth: "0.3px"}}>
              <h4 data-class={clase.className}>{clase.className} - ${clase.cost}</h4>
            </a>
          )
        })
        currentComponent.setState({classes: classes});
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
                    {this.state.classes}
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
