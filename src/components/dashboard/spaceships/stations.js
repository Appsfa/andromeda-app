import React from 'react';
const axios = require('axios');

class Stations extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      stations: []
    };

  }

  componentDidMount(){
    let currentComponent = this;
    axios.get('https://andromeda-api-buscabar.herokuapp.com/stations')
      .then(function (response) {
        // handle success
        console.log(response);
        let stations = response.data.station.map((station) => {
          return(
              <option data-country={station.country} data-state={station.state} value={station.station}>{station.station}</option>
          )
        })
        currentComponent.setState({stations: stations});
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
    return(
      this.state.stations
    )
  }

}

export default Stations;
