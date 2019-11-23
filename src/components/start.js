import React from 'react';
import Navigation from './navigation';
import {Link} from 'react-router-dom';

const axios = require('axios');

// import './App.css';
// <h3 class="mx-auto text-white"><b>{country.country}</b></h3>

class MyComp extends React.Component{

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
                <Link to={"/states/" + country.country} class="col-12 d-flex align-items-center bg-center border" style={{backgroundImage: `url(${country.image})`, height: "150px"}}>

                </Link>
              </div>
            </div>
          )
        })
        currentComponent.setState({countries: countries});
        console.log(`State: ${currentComponent.state.countries}`);
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
                    {this.state.countries}
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
export default MyComp;
