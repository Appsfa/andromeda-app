import React from 'react';
import background from './../media/img/andromeda-background.jpg';
import logo from './../media/img/andromeda.png';
import {Link} from 'react-router-dom';

class Home extends React.Component{

    render() {
        return (
          <main class="bg-center d-flex align-items-center" style={{backgroundImage: `url(${background})`, height: `${window.innerHeight}px`}}>
            <div class="container-fluid">
              <div class="row">
                <div class="col-12 text-center text-white">
                  <img src={logo} width="280vh" class="mb-3"/>
                  <h1 class="text-uppercase font-space-age">Andromeda</h1>
                  <h5 class="mb-4">Que la fuerza te acompañe</h5>
                  <Link to="/start" class="btn btn-lg rounded-pill btn-light">Empezar viaje</Link>
                </div>
              </div>
            </div>
          </main>
        )
    }

}
export default Home;
