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
          )
        }

        else {
          return (
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
          )
        }
      }

      else{
        return (
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
      )
      }

    }

}
export default Navigation;
