import React, { useState } from 'react';
import Navigation from './../../navigation';
import SideNav from './../side-nav';
import {Link} from 'react-router-dom';
import Stations from './stations';
import Planets from './planets';
// import { Button } from 'react-bootstrap';
// import Modal from 'react-bootstrap/Modal'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import toaster from "toasted-notes";
import $ from 'jquery';
import "toasted-notes/src/styles.css"; // optional styles

// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';


const axios = require('axios');

class flighs extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      profile: window.localStorage,
      spaceship: '',
      flights: [],
      idfligh: '',
      type: '',
      totalSeats: '',
      stateModal: false,
      stateModalCreate: false,
      stateModalDelete: false,
      messageModal: '',
      date: '',
      country: '',
      state: '',
      origen: '',
      planet: '',
      minutes: 0,
      days: 0,
      llegada: '',
      regreso: '',
      aterriza: ''
    };


    this.createFlights = this.createFlights.bind(this);
    this.updateFlight = this.updateFlight.bind(this);
    this.getFlight = this.getFlight.bind(this);
    this.deleteFlight = this.deleteFlight.bind(this);

    this.getStation = this.getStation.bind(this);

    this.setStateModal = this.setStateModal.bind(this);
    this.setStateModalCreate = this.setStateModalCreate.bind(this);
    this.setStateModalDelete = this.setStateModalDelete.bind(this);

    // HANDLES DE FORM CREATE
    this.handleOrigen = this.handleOrigen.bind(this);
    this.handlePlaneta= this.handlePlaneta.bind(this);
    this.handleMinutos = this.handleMinutos.bind(this);
    this.handleDias = this.handleDias.bind(this);

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleTotalSeatsChange = this.handleTotalSeatsChange.bind(this);

    this.handleEditTypeChange = this.handleEditTypeChange.bind(this);
    this.handleEditTotalSeatsChange = this.handleEditTotalSeatsChange.bind(this);

  }

  /**
 * -----------------------------------------------------------------------
 *                          HANDLES DE FORM CREATE
 * -----------------------------------------------------------------------
 */

  handleOrigen(event){
    this.setState({origen: event.target.value});
    let currentComponent = this;
    console.log(event.target.value);
    axios.get(`https://andromeda-api-buscabar.herokuapp.com/stations/${event.target.value}`)
      .then(function (response) {
        // handle success
        console.log(response);
        let station = response.data.station;
        currentComponent.setState({country: station.country, state: station.state});
        console.log(currentComponent.state);
        // currentComponent.setState({flights: flights});
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  handlePlaneta(event){
    this.setState({planet: event.target.value});
    this.state.planet = event.target.value;
    console.log(event.target.value);
    console.log(this.state);
  }

  handleMinutos(event){
    this.setState({minutes: event.target.value});
    var d = new Date();
    var mili = d.getMilliseconds().toString();
    mili = mili.substr(0,2);

    var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + ("0" + (d.getDate())).slice(-2) + "T" + ("0" + d.getHours()).slice(-2) + `:${this.state.minutes}:00:000Z`;
    this.setState({llegada: date});
  }

  handleDias(event){
    this.setState({days: event.target.value});
    console.log(event.target.value);
    var d = new Date();
    var mili = d.getMilliseconds().toString();
    mili = mili.substr(0,2);
    var date2 = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + ("0" + (d.getDate()+this.state.days)).slice(-2) + "T" + ("0" + d.getHours()).slice(-2) + `:00:00:000Z`;
    this.setState({regreso: date2});

    var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + ("0" + (d.getDate()+this.state.days)).slice(-2) + "T" + ("0" + d.getHours()).slice(-2) + `:${this.state.minutes}:00:000Z`;
    this.setState({aterriza: date});
  }


  setStateModalDelete(event){
    var test = this.state.stateModal != false ? () => {
      this.setStateModal();
      console.log(this.state);
      this.state.messageModal = $(event.target).attr('data-message');
    } : ()=>{};
    test();
    this.setState({stateModalDelete: !this.state.stateModalDelete});

  }

  setStateModal(){
    this.setState({stateModal: !this.state.stateModal});
  }

  setStateModalCreate(){
    this.setState({stateModalCreate: !this.state.stateModalCreate});
  }

  handleEditTypeChange(event){
    this.setState({type: event.target.value});
  }

  handleEditTotalSeatsChange(event){
    this.setState({totalSeats: event.target.value});
  }

  handleTypeChange(event){
    this.setState({type: event.target.value});
  }
  handleTotalSeatsChange(event){
    this.setState({totalSeats: event.target.value});
  }

  deleteFlight(){
    let currentComponent = this;

    var config = {
      headers: {
        'content-type': 'application/json',
        'token': 'Bearer',
        'authorization': 'bearer ' + window.localStorage.getItem('token')
      }
    };

    console.log(currentComponent.state);

    axios.delete(`https://andromeda-api-buscabar.herokuapp.com/flights/${currentComponent.state.idflight}`, config)
    .then(function (response) {
      console.log(response);
      currentComponent.setStateModalDelete();
      currentComponent.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getFlight(event){
    let currentComponent = this;
    let flight = $(event.target).attr('data-flight');
    currentComponent.setState({idfligh: flight});

    axios.get(`https://andromeda-api-buscabar.herokuapp.com/flights/${$(event.target).attr('data-flight')}`)
    .then(function (response) {
      console.log(response);
      currentComponent.setStateModal();
      currentComponent.setState({type: response.data.flight.type, totalSeats: response.data.flight.totalSeats});
      $("#txtEditType").val(response.data.flight.type);
      $("#txtEditTotalSeats").val(response.data.flight.totalSeats);

      $("#btnUpdate").removeAttr('disabled', 'disabled');
      $("#btnDelete").attr('data-flight', flight);
      $("#btnDelete").attr('data-message', `flight ${flight}`);

      // console.log(currentComponent.state);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateFlight(event){
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

    axios.put(`https://andromeda-api-buscabar.herokuapp.com/flights/${currentComponent.state.idfligh}`, {

        type: currentComponent.state.type,
        totalSeats: currentComponent.state.totalSeats,


    }, config)
    .then(function (response) {
      console.log(response);
      currentComponent.setStateModal();
      currentComponent.componentDidMount();
      $("#btnUpdate").attr('disabled', 'disabled');

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  getStation(){

  }

  createFlight(date2, date3, date4, date5){
    let currentComponent = this;

    var config = {
    headers: {
      'content-type': 'application/json',
      'token': 'Bearer',
      'authorization': 'bearer ' + window.localStorage.getItem('token')
      }
    };

    axios.post('https://andromeda-api-buscabar.herokuapp.com/flights', {

      status: "waiting",
      country: currentComponent.state.country,
      state: currentComponent.state.state,
      station: currentComponent.state.origen,
      idSpaceship: currentComponent.state.spaceship,
      originPlanet: 'Tierra',
      arrivalPlanet: currentComponent.state.planet,
      departureTimeOrigin: date2,
      arrivalTimeOrigin: date3,
      departureTimeDestination: date4,
      arrivalTimeDestination: date5,
      travelDuration: currentComponent.state.minutes

    }, config)
    .then(function (response) {
      console.log(response);
      currentComponent.setStateModalCreate();
      currentComponent.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  createFlights(event){
    let currentComponent = this;
    event.preventDefault();

    var d2 = new Date();

    console.log(d2.getHours());

    for(var i = d2.getHours(); i < 24; i++){
      var d = new Date();
      var date2 = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + ("0" + (d.getDate())).slice(-2) + "T" + (i) + `:00:00:000Z`;
      var date3 = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + ("0" + (d.getDate())).slice(-2) + "T" + (i) + `:${this.state.minutes}:00:000Z`;
      var date4 = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + ("0" + (d.getDate() + this.state.days)).slice(-2) + "T" + (i) + `:00:00:000Z`;
      var date5 = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + ("0" + (d.getDate() + this.state.days)).slice(-2) + "T" + (i) + `:${this.state.minutes}:00:000Z`;
      console.log(date2);
      console.log(date3);
      console.log(date4);
      console.log(date5);
      currentComponent.setState({date: date2, llegada: date3, regreso: date4, aterriza: date5});
      currentComponent.createFlight(date2, date3, date4, date5);
    }



  }

  /**
 * -----------------------------------------------------------------------
 *                           COMPONENT DID MOUNT
 * -----------------------------------------------------------------------
 */

  componentDidMount(){
    let currentComponent = this;
    const {match: {params}} = this.props;
    this.setState({spaceship: params.idSpaceship});
    axios.get(`https://andromeda-api-buscabar.herokuapp.com/flights/spaceship/${params.idSpaceship}`)
      .then(function (response) {
        // handle success
        console.log(response);
        let flights = response.data.flight.map((flight) => {
          return(
            <div class="col-12 border-bottom border-secondary py-2 d-flex justify-content-between" style={{borderWidth: "0.3px"}}>
              <Link class="d-flex align-items-center no-under-line-hover text-black">{flight.originPlanet} - {flight.station} - {flight._id}</Link>
              <button class="btn material-icons icon-md" onClick={currentComponent.getFlight} data-flight={flight._id}>more_vert</button>
            </div>
          )
        })
        currentComponent.setState({flights: flights});
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });


      var d = new Date();
      var mili = d.getMilliseconds().toString();
      mili = mili.substr(0,2);

      var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + ("0" + (d.getDate()+1)).slice(-2) + "T" + ("0" + d.getHours()).slice(-2) + ":00:00:000Z";
      // console.log(d.getMinutes());
      console.log(date);
      this.setState({date: date});
  }

  render() {
      return (

        <div class="w-100">
          <header>
            <Navigation/>
          </header>
          <main class="container-fluid mb-5">
            <div class="row">
              <div class="d-none d-lg-block col-12 col-sm-12 col-md-1 col-lg-4 col-xl-3 pt-4">
                <SideNav/>
              </div>

              <div class="col-12 col-sm-12 col-md-10 col-lg-5 col-xl-7 pt-4 mb-5">
                <div class="row">
                  <div class="col-12 mb-3">
                    <h1><b>Vuelos</b></h1>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      {this.state.flights}
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
                Agregar Nave Espacial <button data-menu="#menuAdd" onClick={this.setStateModalCreate} class="btn-close-menu-bottom btn btn-blue rounded-circle shadow-lg btn-sm ml-2"><i class="material-icons mt-1">account_balance</i></button>
              </li>
            </ul>
            <button type="button" id="btnOpenOptions" data-menu="#menuAdd" class="open-menu-bottom btn btn-success rounded-circle shadow-lg btn-lg"><i class="material-icons mt-2">add</i></button>
          </div>


          {/**
 * -----------------------------------------------------------------------
 *                               MODAL CREATE
 * -----------------------------------------------------------------------
 */}

          <div>
            <Modal isOpen={this.state.stateModalCreate} toggle={this.setStateModalCreate}>
              <ModalHeader toggle={this.setStateModalCreate}>Agregar Nave Espacial</ModalHeader>
              <ModalBody>
                <form id="formCreate" onSubmit={this.createFlights}>
                  <div class="form-row">

                    <FormGroup className="col-12 form-group px-2 mb-4">
                      <Label for="txtStation">Estación</Label>
                      <Input type="select" name="select" id="txtStation" onChange={this.handleOrigen} require>
                        <option value="" selected disabled>Seleccionar Estación</option>
                        <Stations/>
                      </Input>
                    </FormGroup>

                    <FormGroup className="col-12 form-group px-2 mb-4">
                      <Label for="txtPlanet">Planeta</Label>
                      <Input type="select" name="select" id="txtPlanet" require onChange={this.handlePlaneta}>
                        <option value="" selected disabled>Seleccionar Planeta de llegada</option>
                        <Planets/>
                      </Input>
                    </FormGroup>

                    <div class="col-12 form-group px-2 mb-4">
                      <label for="txtStartDate" class="black-text">Hora de salida</label>
                      <input class="form-control material-design-black" type="text" value={this.state.date} placeholder="Hora de salida" id="txtStartDate" require />
                    </div>

                    <div class="col-12 form-group px-2 mb-4">
                      <label for="txtMinutes" class="black-text">¿Cuánto tarda en llegar? (Minutos)</label>
                      <input class="form-control material-design-black" type="text" placeholder="¿Cuánto tarda en llegar? (Minutos)" onKeyUp={this.handleMinutos} id="txtMinutes" require />
                    </div>

                    <div class="col-12 form-group px-2 mb-4">
                      <label for="txtStand" class="black-text">¿Cuánto tiempo permanecerán? (Días)</label>
                      <input class="form-control material-design-black" type="text" placeholder="¿Cuánto tiempo permanecerán? (Días)" onKeyUp={this.handleDias} id="txtStand" require />
                    </div>

                    <div class="col-12 form-group px-2 mb-4">
                      <label for="txtLlegada" class="black-text">Hora de llegada</label>
                      <input class="form-control material-design-black" type="text" value={this.state.llegada} placeholder="Hora de llegada" id="txtLlegada" require />
                    </div>

                    <div class="col-12 form-group px-2 mb-4">
                      <label for="txtRegresar" class="black-text">Cuando regresas</label>
                      <input class="form-control material-design-black" type="text" value={this.state.regreso} placeholder="Cuando regresas" id="txtRegresar" require />
                    </div>

                    <div class="col-12 form-group px-2 mb-4">
                      <label for="txtLlegas" class="black-text">Cuando llegas</label>
                      <input class="form-control material-design-black" type="text" value={this.state.aterriza} placeholder="Cuando llegas" id="txtLlegas" require />
                    </div>

                  </div>
                </form>
              </ModalBody>
              <div class="px-3 mb-3">
                <button type="submit" form="formCreate" class="btn btn-success w-100 mb-2">Agregar Vuelos</button>
                <button type="button" class="btn btn-danger w-100" onClick={this.setStateModalCreate}>Cancelar</button>
              </div>
            </Modal>
          </div>

          <div>
            <Modal isOpen={this.state.stateModal} toggle={this.setStateModal}>
              <ModalHeader toggle={this.setStateModal} close={<button class="btn material-icons icon-md" id="btnDelete" onClick={this.setStateModalDelete}>delete</button>} className="d-flex align-items-center">Editar Nave Espacial</ModalHeader>
              <ModalBody>
                <form id="formUpdate" onSubmit={this.updateFlight}>
                  <div class="form-row">

                    <FormGroup className="col-12 form-group px-2 mb-4">
                      <Label for="txtEditType">Tipo de Nave Espacial</Label>
                      <Input type="select" name="select" id="txtEditType" onChange={this.handleEditTypeChange}>
                        <option value="">Seleccionar Tipo de Nave Espacial</option>
                        <option value="Boomerang">Boomerang</option>
                        <option value="MilkyWays">MilkyWays</option>
                        <option value="Interestelar">Interestelar</option>
                      </Input>
                    </FormGroup>

                    <div class="col-12 form-group px-2 mb-4">
                      <label for="txtEditTotalSeats" class="black-text">Asientos Totales</label>
                      <input class="form-control material-design-black" onChange={this.handleEditTotalSeatsChange} type="text" placeholder="Asientos totales"  id="txtEditTotalSeats" required />
                    </div>

                  </div>
                </form>
              </ModalBody>
              <div class="px-3 mb-3">
                <button type="submit" id="btnUpdate" form="formUpdate" class="btn btn-success w-100 mb-2">Guardar Nave Espacial</button>
                <button type="button" class="btn btn-danger w-100" onClick={this.setStateModal}>Cancelar</button>
              </div>
            </Modal>
          </div>

          <div>
            <Modal isOpen={this.state.stateModalDelete} toggle={this.setStateModalDelete} className="modal-dialog modal-sm modal-dialog-centered">
              <ModalBody className="p-0">
                <div class="container-fluid">
                  <div class="row">

                    <div class="col-12 text-center pt-2">
                      <h5><b>Borrar</b></h5>
                    </div>

                    <div class="col-12 text-center mb-3">
                      ¿Desea borrar <span>{this.state.messageModal}</span>?
                    </div>

                    <div class="col-12">
                      <div class="container-fluid p-0">
                        <div class="row">
                          <button onClick={this.setStateModalDelete} class="btn rounded-0 col-6 p-0 border-top border-right text-center text-danger cursor-pointer py-2" data-dismiss="modal" id="btn-cancel-modal-delete">
                            Cancelar
                          </button>
                          <button onClick={this.deletefligh} class="btn rounded-0 col-6 p-0 border-top text-center text-primary cursor-pointer py-2" id="btnAcceptDelete" data-fligh={this.state.fligh}>
                            <b>Aceptar</b>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </Modal>
          </div>

        </div>
    )
  }
}

export default flighs;
