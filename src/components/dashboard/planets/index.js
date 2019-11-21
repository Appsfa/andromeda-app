import React from 'react';
import Navigation from './../../navigation';
import SideNav from './../side-nav';
import {Link} from 'react-router-dom';
import $ from 'jquery';

// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';


const axios = require('axios');

class Planets extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      profile: window.localStorage,
      planets: [],
      name: '',
      type: '',
      goBack: ''
    };

    this.createPlanet = this.createPlanet.bind(this);
    this.updatePlanet = this.updatePlanet.bind(this);
    this.getPlanet = this.getPlanet.bind(this);

    this.handleNameChange = this.handlePlanetChange.bind(this);
    this.handleTypeChange = this.handleImageChange.bind(this);
    this.handleGoBackChange = this.handleImageChange.bind(this);

    this.openModalUpdate = this.openModalUpdate.bind(this);

    this.handleEditNameChange = this.handlePlanetChange.bind(this);
    this.handleEditTypeChange = this.handleImageChange.bind(this);
    this.handleEditGoBackChange = this.handleImageChange.bind(this);
  }


 /*  _    _          _   _ _____  _      ______  _____   _____  ______    _____ _____  ______          _____
 | |  | |   /\   | \ | |  __ \| |    |  ____|/ ____| |  __ \|  ____|  / ____|  __ \|  ____|   /\   |  __ \
 | |__| |  /  \  |  \| | |  | | |    | |__  | (___   | |  | | |__    | |    | |__) | |__     /  \  | |__) |
 |  __  | / /\ \ | . ` | |  | | |    |  __|  \___ \  | |  | |  __|   | |    |  _  /|  __|   / /\ \ |  _  /
 | |  | |/ ____ \| |\  | |__| | |____| |____ ____) | | |__| | |____  | |____| | \ \| |____ / ____ \| | \ \
 |_|  |_/_/    \_\_| \_|_____/|______|______|_____/  |_____/|______|  \_____|_|  \_\______/_/    \_\_|  \_\

                                                                                                           */

/**
 * -----------------------------------------------------------------------
 *                             HANLDE DE UPDATE
 * -----------------------------------------------------------------------
 */
  handleEditPlanetChange(event){
    this.setState({newPlanet: event.target.value});
  }

  handleEditImageChange(event){
    this.setState({image: event.target.value});
  }

  /**
   * -----------------------------------------------------------------------
   *                             HANLDE DE CREATE
   * -----------------------------------------------------------------------
   */

  handlePlanetChange(event){
    this.setState({planet: event.target.value});
  }

  handleImageChange(event){
    this.setState({image: event.target.value});
  }

/**
 * -----------------------------------------------------------------------
 *                            ABRIR MODAL UPDATE
 * -----------------------------------------------------------------------
 */

  openModalUpdate(event){
    console.log($(event.target).attr('data-planet'));
    this.getPlanet($(event.target).attr('data-planet'));
    $("#modalEditPlanet").modal('show');
  }


  /**
 * -----------------------------------------------------------------------
 *                             OBTENER PLANETA
 * -----------------------------------------------------------------------
 */
  getPlanet(planet){
    let currentComponent = this;

    axios.get(`https://andromeda-api-buscabar.herokuapp.com/Planets/${planet}`)
    .then(function (response) {
      console.log(response);
      $("#txtEditPlanet").val(response.data.planet.planet);
      $("#txtEditImage").val(response.data.planet.image);
      currentComponent.setState({planet: response.data.planet.planet, image: response.data.planet.image});
      $("#btnUpdate").removeAttr('disabled', 'disabled');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

/**
 * -----------------------------------------------------------------------
 *                            UPDATE DE PLANETA
 * -----------------------------------------------------------------------
 */
  updatePlanet(event){
    let currentComponent = this;
    event.preventDefault();
    console.log(this.state);
    var config = {
      headers: {
        'content-type': 'application/json',
        'token': 'Bearer',
        'authorization': 'bearer ' + window.localStorage.getItem('token')
      }
    };

    axios.put(`https://andromeda-api-buscabar.herokuapp.com/planets/${currentComponent.state.planet}`, {

        name: currentComponent.state.newPlanet,
        type: currentComponent.state.image,
        goBack: currentComponent.state.goBack

    }, config)
    .then(function (response) {
      console.log(response);
      currentComponent.componentDidMount();
      $("#btnUpdate").attr('disabled', 'disabled');

    })
    .catch(function (error) {
      console.log(error);
    });

  }

/**
 * -----------------------------------------------------------------------
 *                              CREAR PLANETA
 * -----------------------------------------------------------------------
 */

  createPlanet(event){
    let currentComponent = this;
    event.preventDefault();
    console.log(this.state);
    // $("#modalAddPlanet").modal('hide');
    var config = {
    headers: {
      'content-type': 'application/json',
      'token': 'Bearer',
      'authorization': 'bearer ' + window.localStorage.getItem('token')
    }
};

    axios.post('https://andromeda-api-buscabar.herokuapp.com/planets', {

      name: currentComponent.state.newPlanet,
      type: currentComponent.state.image,
      goBack: currentComponent.state.goBack

    }, config)
    .then(function (response) {
      console.log(response);

    })
    .catch(function (error) {
      console.log(error);
    });

  }

/**
 * -----------------------------------------------------------------------
 *                            RENDERIZA PLANETAS
 * -----------------------------------------------------------------------
 */

  componentDidMount(){
    let currentComponent = this;
    axios.get('https://andromeda-api-buscabar.herokuapp.com/planets/')
      .then(function (response) {
        // handle success
        console.log(response);
        let planets = response.data.planet.map((planet) => {
          return(
            <div class="col-12 border-bottom border-secondary py-2 no-under-line-hover text-black d-flex justify-content-between" style={{borderWidth: "0.3px"}}>
              <Link to={"/dashboard/planets/" + planet.planet}>{planet.planet}</Link>
              <button class="btn" onClick={currentComponent.openModalUpdate} data-planet={planet.planet} data-toggle="modal" data-target="#modalEditPlanet">Options</button>
            </div>
          )
        })
        currentComponent.setState({planets: planets});
        console.log(`State: ${currentComponent.state.planets}`);
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
              <div class="d-none d-lg-block col-12 col-sm-12 col-md-1 col-lg-4 col-xl-3 pt-4">
                <SideNav/>
              </div>

              <div class="col-12 col-sm-12 col-md-10 col-lg-5 col-xl-7 pt-4">
                <div class="row">
                  <div class="col-12 mb-3">
                    <h1><b>Planetas</b></h1>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      {this.state.planets}
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-none d-lg-block col-12 col-sm-12 col-md-1 col-lg-3 col-xl-2 pt-4">

              </div>

            </div>
          </main>
          <div class="position-fixed text-right p-4" style={{bottom: "0px", right: "0px"}}>
            <ul id="menuAdd" class="menu p-0 text-decoration-none mr-2 mb-0 pb-3 d-none" style={{listStyleType: "none"}}>
              <li class="mt-3">
                Agregar Planetas <button data-menu="#menuAdd" data-target="#modalAddPlanet" data-toggle="modal" class="btn-close-menu-bottom btn btn-blue rounded-circle shadow-lg btn-sm ml-2"><i class="material-icons mt-1">account_balance</i></button>
              </li>
            </ul>
            <button type="button" id="btnOpenOptions" data-menu="#menuAdd" class="open-menu-bottom btn btn-success rounded-circle shadow-lg btn-lg"><i class="material-icons mt-2">add</i></button>
          </div>


          <div class="modal fade" id="modalAddPlanet" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-black">Agregar planeta</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form id="formCreate" onSubmit={this.createPlanet}>
                    <div class="form-row">

                      <div class="col-12 form-group px-2">
                        <label for="txtPlanet" class="black-text">Planeta</label>
                        <input class="form-control material-design-black" value={this.state.planet} onChange={this.handlePlanetChange} type="text" placeholder="Planeta" id="txtPlanet" required />
                      </div>

                    </div>
                  </form>
                </div>

                <div class="px-3 mb-3">
                  <button type="submit" form="formCreate" class="btn btn-success w-100 mb-2">Agregar Planeta</button>
                  <button type="button" class="btn btn-danger w-100" data-dismiss="modal">Cancelar</button>
                </div>

              </div>
            </div>
          </div>

          <div class="modal fade" id="modalEditPlanet" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-black">Editar Planeta</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form id="formUpdate" onSubmit={this.updatePlanet}>
                    <div class="form-row">

                      <div class="col-12 form-group px-2">
                        <label for="txtEditPlanet" class="black-text">Planeta</label>
                        <input class="form-control material-design-black" onChange={this.handleEditPlanetChange} type="text" placeholder="Planeta" id="txtEditPlanet" required />
                      </div>

                    </div>
                  </form>
                </div>

                <div class="px-3 mb-3">
                  <button type="submit" id="btnUpdate" form="formUpdate" class="btn btn-success w-100 mb-2">Guardar Planeta</button>
                  <button type="button" class="btn btn-danger w-100" data-dismiss="modal">Cancelar</button>
                </div>

              </div>
            </div>
          </div>

        </div>
    )
  }
}

export default Planets;
