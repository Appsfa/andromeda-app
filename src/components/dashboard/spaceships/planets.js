import React from 'react';
const axios = require('axios');

class Planets extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      planets: []
    };

  }

  componentDidMount(){
    let currentComponent = this;
    axios.get('https://andromeda-api-buscabar.herokuapp.com/planets')
      .then(function (response) {
        // handle success
        console.log(response);
        let planets = response.data.planet.map((planet) => {
          return(
              <option value={planet.name}>{planet.name}</option>
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
    return(
      this.state.planets
    )
  }

}

export default Planets;
