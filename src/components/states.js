import React from 'react';
import Navigation from './navigation';
import {Link} from 'react-router-dom';

const axios = require('axios');

// import './App.css';

class MyCompStates extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      states: [],
    };

    // this.componentDidMount.bind(this);
  }

  componentDidMount(){
    let currentComponent = this;
    const {match: {params}} = this.props;
    axios.get(`https://andromeda-api-buscabar.herokuapp.com/states/country/${params.idCountry}`)
      .then(function (response) {
        // handle success
        console.log(response);
        let states = response.data.state.map((state) => {
          return(
            <Link to={"/stations/" + state.state} class="col-12 text-center border-bottom border-secondary py-2" style={{borderWidth: "0.3px"}}>
              <h4>{state.state}</h4>
            </Link>
          )
        })
        currentComponent.setState({states: states});
        console.log(currentComponent.state);
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
                      <h2><b>Estados</b></h2>
                    </div>
                    {this.state.states}
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
