mport React, { useState } from 'react';
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

class additional_service extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      profile: window.localStorage,
      additional_service: [],
      nameService: '',
      newAdditional_Service: '',
      stateModal: false,
      stateModalCreate: false,
      stateModalDelete: false,
      messageModal: ''
    };


    this.createAdditional_Service = this.createAdditional_Service.bind(this);
    this.updateAdditional_Service = this.updateAdditional_Service.bind(this);
    this.getAdditional_Service = this.getAdditional_Service.bind(this);
    this.deleteAdditional_Service = this.deleteAdditional_Service.bind(this);

    this.setStateModal = this.setStateModal.bind(this);
    this.setStateModalCreate = this.setStateModalCreate.bind(this);
    this.setStateModalDelete = this.setStateModalDelete.bind(this);

    this.handleAdditional_ServiceChange = this.handleAdditional_ServiceChange.bind(this);

    this.handleEditAdditional_ServiceChange = this.handleEditAdditional_ServiceChange.bind(this);

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

  handleEditAdditional_ServiceChange(event){
    this.setState({newAdditional_Service: event.target.value});
  }

  handleAdditional_ServiceChange(event){
    this.setState({nameService: event.target.value});
  }

  deleteAdditional_Service(){
    let currentComponent = this;

    var config = {
      headers: {
        'content-type': 'application/json',
        'token': 'Bearer',
        'authorization': 'bearer ' + window.localStorage.getItem('token')
      }
    };

    console.log(currentComponent.state);

    axios.delete(`https://andromeda-api-buscabar.herokuapp.com/additional_service/${currentComponent.state.nameService}`, config)
    .then(function (response) {
      console.log(response);
      currentComponent.setStateModalDelete();
      currentComponent.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getAdditional_Service(event){
    let currentComponent = this;
    let additional_service = $(event.target).attr('data-additional_service');
    // currentComponent.setState({statu: additional_Service});

    axios.get(`https://andromeda-api-buscabar.herokuapp.com/additional_service/${additional_service}`)
    .then(function (response) {
      console.log(response);
      currentComponent.setStateModal();
      currentComponent.setState({nameService: additional_service()});
      $("#txtEditAdditional_Service").val(response.data.additional_service.nameService);

      $("#btnUpdate").removeAttr('disabled', 'disabled');
      $("#btnDelete").attr('data-additional_service', additional_service);
      $("#btnDelete").attr('data-message', `additional_service ${additional_service}`);

      console.log(currentComponent.state);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateAdditional_Service(event){
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

    axios.put(`https://andromeda-api-buscabar.herokuapp.com/additional_service/${currentComponent.state.nameService}`, {

        statu: currentComponent.state.newAdditional_Service,

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

  createAdditional_Service(event){
    let currentComponent = this;
    event.preventDefault();
    // console.log(this.state);
    // $("#modalAddAdditional_Service").modal('hide');
    var config = {
    headers: {
      'content-type': 'application/json',
      'token': 'Bearer',
      'authorization': 'bearer ' + window.localStorage.getItem('token')
    }
};

    axios.post('https://andromeda-api-buscabar.herokuapp.com/additional_service', {

      nameService: currentComponent.state.nameService,

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
    axios.get('https://andromeda-api-buscabar.herokuapp.com/additional_service')
      .then(function (response) {
        // handle success
        // console.log(response);
        let additional_service = response.data.additional_service.map((additional_service) => {
          return(
            <div class="col-12 border-bottom border-secondary py-2 d-flex justify-content-between" style={{borderWidth: "0.3px"}}>
              <Link to={"/dashboard/additional_service/" + additional_service.nameService} class="d-flex align-items-center no-under-line-hover text-black">{additional_service.nameService}</Link>
              <button class="btn material-icons icon-md" onClick={currentComponent.getAdditional_Service} data-additional_service={additional_service.nameService}>more_vert</button>
            </div>
          )
        })
        currentComponent.setState({additional_service: additional_service});
        // console.log(currentComponent.state.additional_service);
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
                    <h1><b>Servicios Adicionales</b></h1>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      {this.state.additional_service}
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
                Agregar Servicio Adicional <button data-menu="#menuAdd" onClick={this.setStateModalCreate} class="btn-close-menu-bottom btn btn-blue rounded-circle shadow-lg btn-sm ml-2"><i class="material-icons mt-1">account_balance</i></button>
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
              <ModalHeader toggle={this.setStateModalCreate}>Agregar Servicio Adicional</ModalHeader>
              <ModalBody>
                <form id="formCreate" onSubmit={this.createAdditional_Service}>
                  <div class="form-row">

                    <div class="col-12 form-group px-2">
                      <label for="txtAdditional_Service" class="black-text">Servicio Adicional</label>
                      <input class="form-control material-design-black" onChange={this.handleAdditional_ServiceChange} type="text" placeholder="Servicio Adicional" id="txtAdditional_Service" required />
                    </div>

                  </div>
                </form>
              </ModalBody>
              <div class="px-3 mb-3">
                <button type="submit" form="formCreate" class="btn btn-success w-100 mb-2">Agregar Servicio Adicional</button>
                <button type="button" class="btn btn-danger w-100" onClick={this.setStateModalCreate}>Cancelar</button>
              </div>
            </Modal>
          </div>

          <div>
            <Modal isOpen={this.state.stateModal} toggle={this.setStateModal}>
              <ModalHeader toggle={this.setStateModal} close={<button class="btn material-icons icon-md" id="btnDelete" onClick={this.setStateModalDelete}>delete</button>} className="d-flex align-items-center">Editar Servicio Adicional</ModalHeader>
              <ModalBody>
                <form id="formUpdate" onSubmit={this.updateAdditional_Service}>
                  <div class="form-row">

                    <div class="col-12 form-group px-2">
                      <label for="txtEditAdditional_Service" class="black-text">Servicio Adicional</label>
                      <input class="form-control material-design-black" onChange={this.handleEditAdditional_ServiceChange} type="text" placeholder="Servicio Adicional" id="txtEditAdditional_Service" required />
                    </div>

                  </div>
                </form>
              </ModalBody>
              <div class="px-3 mb-3">
                <button type="submit" id="btnUpdate" form="formUpdate" class="btn btn-success w-100 mb-2">Guardar Servicio Adicional</button>
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
                          <button onClick={this.deleteAdditional_Service} class="btn rounded-0 col-6 p-0 border-top text-center text-primary cursor-pointer py-2" id="btnAcceptDelete" data-class={this.state.additional_service}>
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

export default additional_Service;
