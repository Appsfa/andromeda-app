import React from 'react';
import Navigation from './navigation';

const axios = require('axios');

class Login extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      profile: window.localStorage,
      username: '', password: '',
      isLoggedIn: false
    };

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  handleUserChange(event){
    this.setState({username: event.target.value});
  }

  handlePassChange(event){
    this.setState({password: event.target.value});
  }

  saveData(){
    let currentComponent = this;
    axios.get(`https://andromeda-api-buscabar.herokuapp.com/users/${currentComponent.state.username}`)
    .then(function (response) {
      console.log(response);
      window.localStorage.setItem("email", response.data.user.email);
      window.localStorage.setItem("lastName", response.data.user.lastName);
      window.localStorage.setItem("name", response.data.user.name);
      window.localStorage.setItem("profile", response.data.user.profile);
      this.props.history.push("/home");
      // this.setState({profile: window.localStorage});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.username);
    event.preventDefault();

    let currentComponent = this;

    axios.post('https://andromeda-api-buscabar.herokuapp.com/users/login', {

        username: currentComponent.state.username,
        password: currentComponent.state.password

    })
    .then(function (response) {
      console.log(response);
      window.localStorage.setItem("username", currentComponent.state.username);
      window.localStorage.setItem("password", currentComponent.state.password);
      window.localStorage.setItem("token", response.data.accessToken);
      window.localStorage.setItem("session", true);
      // this.setState({profile: window.localStorage});
      currentComponent.setState({isLoggedIn: true});
      currentComponent.saveData();

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
      return (
        <div class="">
          <header>
            <Navigation
              isLoggedIn={this.state.isLoggedIn}
            />
          </header>
          <div class="container-fluid">
            <div class="row">
            <div class="col-12 col-sm-12 col-md-1 col-lg-3 col-xl-4">

            </div>

            <div class="col-12 col-sm-12 col-md-10 col-lg-6 col-xl-4 pt-5">
              <div class="row">
                <div class="col-12 mb-5">
                  <h1 class="m-0"><b>Inicia Sesión</b></h1>
                  <br/>
                  <h6 class="m-0">Bienvenido de nuevo</h6>
                </div>
                <form class="col-12" onSubmit={this.handleSubmit}>
                  <div class="form-row p-0">

                    <div class="col-12 form-group mb-4">
                      <label for="txtUser">Usuario</label>
                      <input value="" class="form-control material-design-black" type="text" value={this.state.username} onChange={this.handleUserChange} placeholder="Usuario" id="txtUser" required/>
                    </div>

                    <div class="col-12 form-group mb-5">
                      <label for="txtPassword">Contraseña</label>
                      <input value="" class="form-control material-design-black" type="password" value={this.state.password} onChange={this.handlePassChange} placeholder="Contraseña" id="txtPassword" required/>
                    </div>

                    <div class="col-12">
                      <button type="submit" class="btn btn-success btn-lg w-100">Iniciar Sesión</button>
                    </div>

                  </div>
                </form>
              </div>
            </div>

            <div class="col-12 col-sm-12 col-md-1 col-lg-3 col-xl-4">

            </div>
            </div>
          </div>
        </div>
      )
    }

  }

export default Login;
