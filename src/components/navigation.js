import React from 'react';
import logo from './../media/img/andromeda.png';
import {Link, browserHistory} from 'react-router-dom';


class Navigation extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.isLoggedIn
    };

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut(){
    window.localStorage.clear();
    // this.props.history.push("/home");
  }

    render() {
      if(window.localStorage.getItem('session')){
        if(window.localStorage.getItem('profile') == "admin"){
          return (
          <React.Fragment>
            <nav class="navbar navbar-expand-lg navbar-light bg-secondary shadow-lg">
              <a class="navbar-brand d-none d-lg-block" href=""><img src={logo} width="80vh" /></a>
              <h2 class="text-uppercase font-space-age text-white d-none d-lg-block">Andromeda</h2>
              <div class="col d-sm-block d-md-block d-lg-none">
                <i class="material-icons text-black icon-lg open-menu cursor-pointer" data-menu="#menu">menu</i>
              </div>
              <div class="col d-sm-block d-md-block d-lg-none text-center">
                <a class="mx-auto" href=""><img src={logo} width="100vh" /></a>
              </div>
              <div class="col d-sm-block d-md-block d-lg-none">

              </div>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                    <Link class="nav-link text-white" to="/home"><big>Inicio</big> <span class="sr-only">(current)</span></Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link text-white" to="/dashboard"><big>Dashboard</big> <span class="sr-only">(current)</span></Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/tickets" class="nav-link text-white"><big>Mis Tickets</big> <span class="sr-only">(current)</span></Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link text-white" onClick={this.handleLogOut}><big>Cerrar Sesión </big><span class="sr-only">(current)</span></Link>
                  </li>
                </ul>
              </div>
          </nav>
          <div id="menu" class="menu heightest d-none slide-out-top position-fixed bg-white text-black pb-4" style={{top: "0px", left: "0px", overflowY: 'scroll', width: "100%", zIndex: 200, transition: "all 2s linear"}} >
            <div class="container-fluid position-absolute">
              <div class="row">
                <div class="col-12 bg-white px-0" id="bg-img-location">
                  <button class="float-right btn bg-transparent close-menu" data-menu="#menu" type="button"><i class="material-icons">close</i></button>
                </div>

                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-12 mb-5">
                        <Link to="/start" style={{width: "100%", textAlign: "center"}} class="btn btn-menu text-black py-3"><p class="d-inline ml-4 pl-1 text-uppercase">Inicio</p></Link>
                        <Link to="/dashboard" style={{width: "100%", textAlign: "center"}} class="btn btn-menu text-black py-3"><p class="d-inline ml-4 pl-1 text-uppercase">Dashboard</p></Link>
                        <Link to="/tickets" style={{width: "100%", textAlign: "center"}} class="btn btn-menu text-black py-3"><p class="d-inline ml-4 pl-1 text-uppercase">Mis Tickets</p></Link>
                        <Link onClick={this.handleLogOut} style={{width: "100%", textAlign: "center"}} class="btn btn-menu text-black py-3"><p class="d-inline ml-4 pl-1 text-uppercase">Cerrar Sesión</p></Link>
                        <div class="dropdown-divider border">

                        </div>

                      </div>
                    </div>
                  </div>

              </div>
            </div>
          </div>
        </React.Fragment>
          )
        }

        else {
          return (
            <React.Fragment>
              <nav class="navbar navbar-expand-lg navbar-light bg-secondary shadow-lg">
                <a class="navbar-brand d-none d-lg-block" href=""><img src={logo} width="80vh" /></a>
                <h2 class="text-uppercase font-space-age text-white d-none d-lg-block">Andromeda</h2>
                <div class="col d-sm-block d-md-block d-lg-none">
                  <i class="material-icons text-black icon-lg open-menu cursor-pointer" data-menu="#menu">menu</i>
                </div>
                <div class="col d-sm-block d-md-block d-lg-none text-center">
                  <a class="mx-auto" href=""><img src={logo} width="100vh" /></a>
                </div>
                <div class="col d-sm-block d-md-block d-lg-none">

                </div>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                      <Link class="nav-link text-white" to="/home"><big>Inicio</big> <span class="sr-only">(current)</span></Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/tickets" class="nav-link text-white"><big>Mis Tickets</big> <span class="sr-only">(current)</span></Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link text-white" onClick={this.handleLogOut}><big>Cerrar Sesión </big><span class="sr-only">(current)</span></Link>
                    </li>
                  </ul>
                </div>
            </nav>

            <div id="menu" class="menu heightest d-none slide-out-top position-fixed bg-white text-black pb-4" style={{top: "0px", left: "0px", overflowY: 'scroll', width: "100%", zIndex: 200, transition: "all 2s linear"}} >
              <div class="container-fluid position-absolute">
                <div class="row">
                  <div class="col-12 bg-white px-0" id="bg-img-location">
                    <button class="float-right btn bg-transparent close-menu" data-menu="#menu" type="button"><i class="material-icons">close</i></button>
                  </div>

                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-12 mb-5">
                          <Link to="/start" style={{width: "100%", textAlign: "center"}} class="btn btn-menu text-black py-3"><p class="d-inline ml-4 pl-1 text-uppercase">Inicio</p></Link>
                          <Link to="/tickets" style={{width: "100%", textAlign: "center"}} class="btn btn-menu text-black py-3"><p class="d-inline ml-4 pl-1 text-uppercase">Mis Tickets</p></Link>
                          <Link onClick={this.handleLogOut} style={{width: "100%", textAlign: "center"}} class="btn btn-menu text-black py-3"><p class="d-inline ml-4 pl-1 text-uppercase">Cerrar Sesión</p></Link>
                          <div class="dropdown-divider border">

                          </div>

                        </div>
                      </div>
                    </div>

                </div>
              </div>
            </div>
          </React.Fragment>
          )
        }
      }

      else{
        return (
        <React.Fragment>
          <nav class="navbar navbar-expand-lg navbar-light bg-secondary shadow-lg">
            <a class="navbar-brand d-none d-lg-block" href=""><img src={logo} width="80vh" /></a>
            <h2 class="text-uppercase font-space-age text-white d-none d-lg-block">Andromeda</h2>
            <div class="col d-sm-block d-md-block d-lg-none">
              <i class="material-icons text-black icon-lg open-menu cursor-pointer" data-menu="#menu">menu</i>
            </div>
            <div class="col d-sm-block d-md-block d-lg-none text-center">
              <a class="mx-auto" href=""><img src={logo} width="100vh" /></a>
            </div>
            <div class="col d-sm-block d-md-block d-lg-none">

            </div>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <Link class="nav-link text-white" to="/home"><big>Inicio</big> <span class="sr-only">(current)</span></Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link text-white" to="/login"><big>Iniciar Sesión</big> <span class="sr-only">(current)</span></Link>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href=""><big>Registrarse </big><span class="sr-only">(current)</span></a>
                </li>
              </ul>
            </div>
        </nav>

        <div id="menu" class="menu heightest d-none slide-out-top position-fixed bg-white text-black pb-4" style={{top: "0px", left: "0px", overflowY: 'scroll', width: "100%", zIndex: 200, transition: "all 2s linear"}} >
          <div class="container-fluid position-absolute">
            <div class="row">
              <div class="col-12 bg-white px-0" id="bg-img-location">
                <button class="float-right btn bg-transparent close-menu" data-menu="#menu" type="button"><i class="material-icons">close</i></button>
              </div>

                <div class="container-fluid">
                  <div class="row">
                    <div class="col-12 mb-5">
                      <Link to="/home" style={{width: "100%", textAlign: "center"}} class="btn btn-menu text-black py-3"><p class="d-inline ml-4 pl-1 text-uppercase">Inicio</p></Link>
                      <Link to="/login" style={{width: "100%", textAlign: "center"}} class="btn btn-menu text-black py-3"><p class="d-inline ml-4 pl-1 text-uppercase">Iniciar Sesión</p></Link>
                      <Link to="/start" style={{width: "100%", textAlign: "center"}} class="btn btn-menu text-black py-3"><p class="d-inline ml-4 pl-1 text-uppercase">Registrarse</p></Link>
                      <div class="dropdown-divider border">

                      </div>

                    </div>
                  </div>
                </div>

            </div>
          </div>
        </div>
        </React.Fragment>


      )
      }

    }

}
export default Navigation;
