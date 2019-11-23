import React from 'react';
import Navigation from './navigation';
import {Link} from 'react-router-dom';

const axios = require('axios');

// import './App.css';

class MyCompStates extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      stations: [],
    };

    // this.componentDidMount.bind(this);
  }

  componentDidMount(){
    let currentComponent = this;
    const {match: {params}} = this.props;
    axios.get(`https://andromeda-api-buscabar.herokuapp.com/stations/state/${params.idState}`)
      .then(function (response) {
        // handle success
        console.log(response);
        let stations = response.data.station.map((station) => {
          return(
            <Link to={"/stations/" + station.station} class="col-12 text-center border-bottom border-secondary py-2" style={{borderWidth: "0.3px"}}>
              <h4>{station.station}</h4>
            </Link>
          )
        })
        currentComponent.setState({stations: stations});
        console.log(currentComponent.stations);
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
                      <h2><b>Estaciones</b></h2>
                    </div>
                    {this.state.stations}
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
export default MyCompStates;
