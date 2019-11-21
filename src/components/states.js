import React from 'react';
import Navigation from './navigation';
const axios = require('axios');

// import './App.css';

class MyCompStates extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      countries: [],
    };

    // this.componentDidMount.bind(this);
  }

  componentDidMount(){
    let currentComponent = this;
    axios.get('https://andromeda-api-buscabar.herokuapp.com/countries/')
      .then(function (response) {
        // handle success
        console.log(response);
        let countries = response.data.country.map((country) => {
          return(
            <div class="col-6 col-md-4 col-lg-3">
              <div class="row p-3">
                <div class="col-12 d-flex align-items-center bg-center" style={{backgroundImage: `url(${country.image})`, height: "150px"}}>
                  <h3 class="mx-auto text-white"><b>{country.country}</b></h3>
                </div>
              </div>
            </div>
          )
        })
        currentComponent.setState({countries: countries});
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
