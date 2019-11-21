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

class Classes extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      profile: window.localStorage,
      classes: [],
      className: '',
      cost: '',
      newClassName: '',
      newCost: '',
      stateModal: false,
      stateModalCreate: false,
      stateModalDelete: false,
      messageModal: ''
    };


    this.createClass = this.createClass.bind(this);
    this.updateClass = this.updateClass.bind(this);
    this.getClass = this.getClass.bind(this);
    this.deleteClass = this.deleteClass.bind(this);

    this.setStateModal = this.setStateModal.bind(this);
    this.setStateModalCreate = this.setStateModalCreate.bind(this);
    this.setStateModalDelete = this.setStateModalDelete.bind(this);

    this.handleClassNameChange = this.handleClassNameChange.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);

    this.handleEditClassNameChange = this.handleEditClassNameChange.bind(this);
    this.handleEditCostChange = this.handleCostChange.bind(this);

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

  handleEditClassNameChange(event){
    this.setState({newClassName: event.target.value});
  }

  handleEditCostChange(event){
    this.setState({cost: event.target.value});
    console.log(this.state);
  }

  handleClassNameChange(event){
    this.setState({className: event.target.value});
  }
  handleCostChange(event){
    this.setState({cost: event.target.value});
  }

  deleteClass(){
    let currentComponent = this;

    var config = {
      headers: {
        'content-type': 'application/json',
        'token': 'Bearer',
        'authorization': 'bearer ' + window.localStorage.getItem('token')
      }
    };

    console.log(currentComponent.state);

    axios.delete(`https://andromeda-api-buscabar.herokuapp.com/classes/${currentComponent.state.className}`, config)
    .then(function (response) {
      console.log(response);
      currentComponent.setStateModalDelete();
      currentComponent.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getClass(event){
    let currentComponent = this;
    let clase = $(event.target).attr('data-class');

    axios.get(`https://andromeda-api-buscabar.herokuapp.com/classes/${$(event.target).attr('data-class')}`)
    .then(function (response) {
      console.log(response);
      currentComponent.setStateModal();
      currentComponent.setState({className: response.data.class.className, cost: response.data.class.cost});
      $("#txtEditClassName").val(response.data.class.className);
      $("#txtEditCost").val(response.data.class.cost);

      $("#btnUpdate").removeAttr('disabled', 'disabled');
      $("#btnDelete").attr('data-class', clase);
      $("#btnDelete").attr('data-message', `clase ${clase}`);

      console.log(currentComponent.state);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateClass(event){
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

    axios.put(`https://andromeda-api-buscabar.herokuapp.com/classes/${currentComponent.state.className}`, {

        className: currentComponent.state.newClassName,
        cost: currentComponent.state.cost,


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

  createClass(event){
    let currentComponent = this;
    event.preventDefault();
    // console.log(this.state);
    // $("#modalAddClass").modal('hide');
    var config = {
    headers: {
      'content-type': 'application/json',
      'token': 'Bearer',
      'authorization': 'bearer ' + window.localStorage.getItem('token')
    }
};

    axios.post('https://andromeda-api-buscabar.herokuapp.com/classes', {

      className: currentComponent.state.className,
      cost: currentComponent.state.cost,

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
    axios.get('https://andromeda-api-buscabar.herokuapp.com/classes')
      .then(function (response) {
        // handle success
        console.log(response);
        let classes = response.data.class.map((clase) => {
          return(
            <div class="col-12 border-bottom border-secondary py-2 d-flex justify-content-between" style={{borderWidth: "0.3px"}}>
              <Link to={"/dashboard/classes/" + clase.className} class="d-flex align-items-center no-under-line-hover text-black">{clase.className}</Link>
              <button class="btn material-icons icon-md" onClick={currentComponent.getClass} data-class={clase.className}>more_vert</button>
            </div>
          )
        })
        currentComponent.setState({classes: classes});
        console.log(`State: ${currentComponent.state.classes}`);
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
                    <h1><b>Clases</b></h1>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      {this.state.classes}
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
                Agregar Clase <button data-menu="#menuAdd" onClick={this.setStateModalCreate} class="btn-close-menu-bottom btn btn-blue rounded-circle shadow-lg btn-sm ml-2"><i class="material-icons mt-1">account_balance</i></button>
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
              <ModalHeader toggle={this.setStateModalCreate}>Agregar Clases</ModalHeader>
              <ModalBody>
                <form id="formCreate" onSubmit={this.createClass}>
                  <div class="form-row">

                    <div class="col-12 form-group px-2">
                      <label for="txtClass" class="black-text">Clase</label>
                      <input class="form-control material-design-black" onChange={this.handleClassNameChange} type="text" placeholder="Clase" id="txtClass" required />
                    </div>

                    <div class="col-12 form-group px-2 mb-4">
                      <label for="txtCost" class="black-text">Costo</label>
                      <input class="form-control material-design-black" onChange={this.handleCostChange} type="text" placeholder="Costo" id="txtCost" />
                    </div>


                  </div>
                </form>
              </ModalBody>
              <div class="px-3 mb-3">
                <button type="submit" form="formCreate" class="btn btn-success w-100 mb-2">Agregar Clase</button>
                <button type="button" class="btn btn-danger w-100" onClick={this.setStateModalCreate}>Cancelar</button>
              </div>
            </Modal>
          </div>

          <div>
            <Modal isOpen={this.state.stateModal} toggle={this.setStateModal}>
              <ModalHeader toggle={this.setStateModal} close={<button class="btn material-icons icon-md" id="btnDelete" onClick={this.setStateModalDelete}>delete</button>} className="d-flex align-items-center">Editar Clase</ModalHeader>
              <ModalBody>
                <form id="formUpdate" onSubmit={this.updateClass}>
                  <div class="form-row">

                    <div class="col-12 form-group px-2">
                      <label for="txtEditClassName" class="black-text">Clase</label>
                      <input class="form-control material-design-black" onChange={this.handleEditClassNameChange} type="text" placeholder="Clase" id="txtEditClassName" required />
                    </div>

                    <div class="col-12 form-group px-2 mb-4">
                      <label for="txtEditCost" class="black-text">Costo</label>
                      <input class="form-control material-design-black" onChange={this.handleEditCostChange} type="text" placeholder="Costo"  id="txtEditCost" required />
                    </div>

                  </div>
                </form>
              </ModalBody>
              <div class="px-3 mb-3">
                <button type="submit" id="btnUpdate" form="formUpdate" class="btn btn-success w-100 mb-2">Guardar Clase</button>
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
                          <button onClick={this.deleteClass} class="btn rounded-0 col-6 p-0 border-top text-center text-primary cursor-pointer py-2" id="btnAcceptDelete" data-class={this.state.class}>
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

export default Classes;
