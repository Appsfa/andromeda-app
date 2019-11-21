import React from 'react';
import Navigation from './../../navigation';
import SideNav from './../side-nav';
import {Link} from 'react-router-dom';
import $ from 'jquery';

// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';


const axios = require('axios');

class Countries extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      profile: window.localStorage,
      country: [],
    };
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
                Agregar País <button data-menu="#menuAdd" data-target="#modalAddCountry" data-toggle="modal" class="btn-close-menu-bottom btn btn-blue rounded-circle shadow-lg btn-sm ml-2"><i class="material-icons mt-1">account_balance</i></button>
              </li>
            </ul>
            <button type="button" id="btnOpenOptions" data-menu="#menuAdd" class="open-menu-bottom btn btn-success rounded-circle shadow-lg btn-lg"><i class="material-icons mt-2">add</i></button>
          </div>


          <div class="modal fade" id="modalAddCountry" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-black">Agregar país</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form id="formCreate" onSubmit={this.createCountry}>
                    <div class="form-row">

                      <div class="col-12 form-group px-2">
                        <label for="txtCountry" class="black-text">País</label>
                        <input class="form-control material-design-black" value={this.state.country} onChange={this.handleCountryChange} type="text" placeholder="País" id="txtCountry" required />
                      </div>

                      <div class="col-12 form-group px-2">
                        <label for="txtImage" class="black-text">Imágen de bandera</label>
                        <input class="form-control material-design-black" value={this.state.image} onChange={this.handleImageChange} type="text" placeholder="Imágen de bandera"  id="txtImage" />
                      </div>

                    </div>
                  </form>
                </div>

                <div class="px-3 mb-3">
                  <button type="submit" form="formCreate" class="btn btn-success w-100 mb-2">Agregar País</button>
                  <button type="button" class="btn btn-danger w-100" data-dismiss="modal">Cancelar</button>
                </div>

              </div>
            </div>
          </div>

          <div class="modal fade" id="modalEditCountry" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-black">Editar País</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form id="formUpdate" onSubmit={this.updateCountry}>
                    <div class="form-row">

                      <div class="col-12 form-group px-2">
                        <label for="txtEditCountry" class="black-text">País</label>
                        <input class="form-control material-design-black" onChange={this.handleEditCountryChange} type="text" placeholder="País" id="txtEditCountry" required />
                      </div>

                      <div class="col-12 form-group px-2">
                        <label for="txtEditImage" class="black-text">Imágen de bandera</label>
                        <input class="form-control material-design-black" onChange={this.handleEditImageChange} type="text" placeholder="Imágen de bandera"  id="txtEditImage" />
                      </div>

                    </div>
                  </form>
                </div>

                <div class="px-3 mb-3">
                  <button type="submit" id="btnUpdate" form="formUpdate" class="btn btn-success w-100 mb-2">Guardar País</button>
                  <button type="button" class="btn btn-danger w-100" data-dismiss="modal">Cancelar</button>
                </div>

              </div>
            </div>
          </div>

        </div>
    )
  }

}

export default Countries;
