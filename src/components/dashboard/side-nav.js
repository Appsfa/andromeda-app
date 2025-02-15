import React from 'react';
import {Link} from 'react-router-dom';

class MyComp extends React.Component{

  render() {
      return (
        <div class="row">
          <Link to="/dashboard" class="btn col-12 py-2 d-flex align-items-center px-4">
            <i class="material-icons icon-md mr-2">dashboard</i>Dashboard
          </Link>

          <Link to="/dashboard/countries" class="btn col-12 py-2 d-flex align-items-center px-4">
            <i class="material-icons icon-md mr-2">apartment</i>Estaciones
          </Link>

          <Link to="/dashboard/flights" class="btn col-12 py-2 d-flex align-items-center px-4">
            <i class="material-icons icon-md mr-2">flight</i>Vuelos
          </Link>

          <Link class="btn col-12 py-2 d-flex align-items-center px-4">
            <i class="material-icons icon-md mr-2">room_service</i>Servicios
          </Link>

          <Link to="/dashboard/planets" class="btn col-12 py-2 d-flex align-items-center px-4">
            <i class="material-icons icon-md mr-2">room_service</i>Planetas
          </Link>

          <Link to="/dashboard/classes" class="btn col-12 py-2 d-flex align-items-center px-4">
            <i class="material-icons icon-md mr-2">room_service</i>Clases
          </Link>

          <Link to="/dashboard/status" class="btn col-12 py-2 d-flex align-items-center px-4">
            <i class="material-icons icon-md mr-2">room_service</i>Estatus
          </Link>

          <Link to="/dashboard/spaceships" class="btn col-12 py-2 d-flex align-items-center px-4">
            <i class="material-icons icon-md mr-2">room_service</i>Naves Espaciales
          </Link>

          <Link to="/dashboard/additional_service" class="btn col-12 py-2 d-flex align-items-center px-4">
            <i class="material-icons icon-md mr-2">room_service</i>Servicios Adicionales
          </Link>

          <Link to="/dashboard/benefits" class="btn col-12 py-2 d-flex align-items-center px-4">
            <i class="material-icons icon-md mr-2">room_service</i>Beneficios
          </Link>
        </div>
      )
    }
  }

export default MyComp;
