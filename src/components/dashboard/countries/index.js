import React, { useState } from 'react';
import Navigation from './../../navigation';
import SideNav from './../side-nav';
import {Link} from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import Modal from 'react-bootstrap/Modal'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import toaster from "toasted-notes";
import $ from 'jquery';
import "toasted-notes/src/styles.css"; // optional styles

// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';


const axios = require('axios');

class Countries extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      profile: window.localStorage,
      countries: [],
      country: '',
      image: '',
      newCountry: '',
      stateModal: false,
      stateModalCreate: false,
      stateModalDelete: false,
      messageModal: ''
    };


    this.createCountry = this.createCountry.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
    this.getCountry = this.getCountry.bind(this);
    this.deleteCountry = this.deleteCountry.bind(this);

    this.setStateModal = this.setStateModal.bind(this);
    this.setStateModalCreate = this.setStateModalCreate.bind(this);
    this.setStateModalDelete = this.setStateModalDelete.bind(this);

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.openModalUpdate = this.openModalUpdate.bind(this);
    this.handleEditCountryChange = this.handleEditCountryChange.bind(this);
    this.handleEditImageChange = this.handleEditImageChange.bind(this);
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

  openModalUpdate(event){
    console.log($(event.target).attr('data-country'));
    this.getCountry($(event.target).attr('data-country'));
    // $("#modalEditCountry").modal('show');
  }

  handleEditCountryChange(event){
    this.setState({newCountry: event.target.value});
  }

  handleEditImageChange(event){
    this.setState({image: event.target.value});
  }

  handleCountryChange(event){
    this.setState({country: event.target.value});
  }

  handleImageChange(event){
    this.setState({image: event.target.value});
  }

  deleteCountry(){
    let currentComponent = this;

    var config = {
      headers: {
        'content-type': 'application/json',
        'token': 'Bearer',
        'authorization': 'bearer ' + window.localStorage.getItem('token')
      }
    };

    console.log(currentComponent.state);

    axios.delete(`https://andromeda-api-buscabar.herokuapp.com/countries/${currentComponent.state.country}`, config)
    .then(function (response) {
      console.log(response);
      currentComponent.setStateModalDelete();
      currentComponent.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getCountry(event){
    let currentComponent = this;
    let country = $(event.target).attr('data-country');

    axios.get(`https://andromeda-api-buscabar.herokuapp.com/countries/${$(event.target).attr('data-country')}`)
    .then(function (response) {
      console.log(response);
      currentComponent.setStateModal();
      $("#txtEditCountry").val(response.data.country.country);
      $("#txtEditImage").val(response.data.country.image);
      currentComponent.setState({country: response.data.country.country, image: response.data.country.image});
      $("#btnUpdate").removeAttr('disabled', 'disabled');
      $("#btnDelete").attr('data-country', country);
      $("#btnDelete").attr('data-message', `país ${country}`);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateCountry(event){
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

    axios.put(`https://andromeda-api-buscabar.herokuapp.com/countries/${currentComponent.state.country}`, {

        country: currentComponent.state.newCountry,
        image: currentComponent.state.image,

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

  createCountry(event){
    let currentComponent = this;
    event.preventDefault();
    console.log(this.state);
    // $("#modalAddCountry").modal('hide');
    var config = {
    headers: {
      'content-type': 'application/json',
      'token': 'Bearer',
      'authorization': 'bearer ' + window.localStorage.getItem('token')
    }
};

    axios.post('https://andromeda-api-buscabar.herokuapp.com/countries', {

        country: currentComponent.state.country,
        image: currentComponent.state.image,

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

  componentDidMount(){
    let currentComponent = this;
    axios.get('https://andromeda-api-buscabar.herokuapp.com/countries/')
      .then(function (response) {
        // handle success
        console.log(response);
        let countries = response.data.country.map((country) => {
          return(
            <div class="col-12 border-bottom border-secondary py-2 d-flex justify-content-between" style={{borderWidth: "0.3px"}}>
              <Link to={"/dashboard/countries/" + country.country} class="d-flex align-items-center no-under-line-hover text-black">{country.country}</Link>
              <button class="btn material-icons icon-md" onClick={currentComponent.getCountry} data-country={country.country}>more_vert</button>
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
              <div class="d-none d-lg-block col-12 col-sm-12 col-md-1 col-lg-4 col-xl-3 pt-4">
                <SideNav/>
              </div>

              <div class="col-12 col-sm-12 col-md-10 col-lg-5 col-xl-7 pt-4">
                <div class="row">
                  <div class="col-12 mb-3">
                    <h1><b>Paises</b></h1>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      {this.state.countries}
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
                Agregar País <button data-menu="#menuAdd" onClick={this.setStateModalCreate} class="btn-close-menu-bottom btn btn-blue rounded-circle shadow-lg btn-sm ml-2"><i class="material-icons mt-1">account_balance</i></button>
              </li>
            </ul>
            <button type="button" id="btnOpenOptions" data-menu="#menuAdd" class="open-menu-bottom btn btn-success rounded-circle shadow-lg btn-lg"><i class="material-icons mt-2">add</i></button>
          </div>


          <div>
            <Modal isOpen={this.state.stateModalCreate} toggle={this.setStateModalCreate}>
              <ModalHeader toggle={this.setStateModalCreate}>Agregar País</ModalHeader>
              <ModalBody>
                <form id="formCreate" onSubmit={this.createCountry}>
                  <div class="form-row">

                    <div class="col-12 form-group px-2">
                      <label for="txtCountry" class="black-text">País</label>
                      <input class="form-control material-design-black" onChange={this.handleCountryChange} type="text" placeholder="País" id="txtCountry" required />
                    </div>

                    <div class="col-12 form-group px-2 mb-4">
                      <label for="txtImage" class="black-text">Imágen de bandera</label>
                      <input class="form-control material-design-black" onChange={this.handleImageChange} type="text" placeholder="Imágen de bandera"  id="txtImage" />
                    </div>

                  </div>
                </form>
              </ModalBody>
              <div class="px-3 mb-3">
                <button type="submit" form="formCreate" class="btn btn-success w-100 mb-2">Agregar País</button>
                <button type="button" class="btn btn-danger w-100" onClick={this.setStateModalCreate}>Cancelar</button>
              </div>
            </Modal>
          </div>

          <div>
            <Modal isOpen={this.state.stateModal} toggle={this.setStateModal}>
              <ModalHeader toggle={this.setStateModal} close={<button class="btn material-icons icon-md" id="btnDelete" onClick={this.setStateModalDelete}>delete</button>} className="d-flex align-items-center">Editar País</ModalHeader>
              <ModalBody>
                <form id="formUpdate" onSubmit={this.updateCountry}>
                  <div class="form-row">

                    <div class="col-12 form-group px-2">
                      <label for="txtEditCountry" class="black-text">País</label>
                      <input class="form-control material-design-black" onChange={this.handleEditCountryChange} type="text" placeholder="País" id="txtEditCountry" required />
                    </div>

                    <div class="col-12 form-group px-2 mb-4">
                      <label for="txtEditImage" class="black-text">Imágen de bandera</label>
                      <input class="form-control material-design-black" onChange={this.handleEditImageChange} type="text" placeholder="Imágen de bandera"  id="txtEditImage" />
                    </div>

                  </div>
                </form>
              </ModalBody>
              <div class="px-3 mb-3">
                <button type="submit" id="btnUpdate" form="formUpdate" class="btn btn-success w-100 mb-2">Guardar País</button>
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
                          <button onClick={this.deleteCountry} class="btn rounded-0 col-6 p-0 border-top text-center text-primary cursor-pointer py-2" id="btnAcceptDelete" data-country={this.state.country}>
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

export default Countries;
