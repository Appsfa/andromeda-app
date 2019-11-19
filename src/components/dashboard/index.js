import React from 'react';
import Navigation from './../navigation';
import SideNav from './side-nav';
import {Link} from 'react-router-dom';

class MyComp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      profile: window.localStorage,
    };

    // this.componentDidMount.bind(this);
  }

  render() {
      return (

        <div class="w-100">
          <header>
            <Navigation/>
          </header>
          <main class="container-fluid">
            <div class="row">
              <div class="d-none d-lg-block col-12 col-sm-12 col-md-1 col-lg-4 col-xl-3 pt-4">
                <SideNav/>
              </div>

              <div class="col-12 col-sm-12 col-md-10 col-lg-8 col-xl-9 pt-4">
                <div class="row">
                  <div class="col-12">
                    <h2><b>Bienvenido {this.state.profile.name} {this.state.profile.lastName}</b></h2>
                  </div>
                </div>
              </div>

            </div>
          </main>
        </div>
    )
  }
}

export default MyComp;
