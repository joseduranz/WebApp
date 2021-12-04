import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { CrearPersonaComponent } from './personas/crear-persona/crear-persona.component';
import { BuscarPersonaComponent } from './personas/buscar-persona/buscar-persona.component';
import { EliminarPersonaComponent } from './personas/eliminar-persona/eliminar-persona.component';
import { EditarPersonaComponent } from './personas/editar-persona/editar-persona.component';
import { CrearVehiculoComponent } from './vehiculos/crear-vehiculo/crear-vehiculo.component';
import { EditarVehiculoComponent } from './vehiculos/editar-vehiculo/editar-vehiculo.component';
import { EliminarVehiculoComponent } from './vehiculos/eliminar-vehiculo/eliminar-vehiculo.component';
import { BuscarVehiculoComponent } from './vehiculos/buscar-vehiculo/buscar-vehiculo.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrearAsesorComponent } from './asesor/crear-asesor/crear-asesor.component';
import { BuscarAsesorComponent } from './asesor/buscar-asesor/buscar-asesor.component';
import { EliminarAsesorComponent } from './asesor/eliminar-asesor/eliminar-asesor.component';
import { EditarAsesorComponent } from './asesor/editar-asesor/editar-asesor.component';
import { EditarAdministradorComponent } from './administrador/editar-administrador/editar-administrador.component';
import { BuscarAdministradorComponent } from './administrador/buscar-administrador/buscar-administrador.component';
import { CrearAdministradorComponent } from './administrador/crear-administrador/crear-administrador.component';
import { EliminarAdministradorComponent } from './administrador/eliminar-administrador/eliminar-administrador.component';
import { IndexAdministradorComponent } from './administrador/index-administrador/index-administrador.component';
import { IndexAsesorComponent } from './asesor/index-asesor/index-asesor.component';
import { IndexPersonaComponent } from './personas/index-persona/index-persona.component';


@NgModule({
  declarations: [
    CrearPersonaComponent,
    BuscarPersonaComponent,
    EliminarPersonaComponent,
    EditarPersonaComponent,
    CrearVehiculoComponent,
    EditarVehiculoComponent,
    EliminarVehiculoComponent,
    BuscarVehiculoComponent,
    CrearAsesorComponent,
    BuscarAsesorComponent,
    EliminarAsesorComponent,
    EditarAsesorComponent,
    EditarAdministradorComponent,
    BuscarAdministradorComponent,
    CrearAdministradorComponent,
    EliminarAdministradorComponent,
    IndexAdministradorComponent,
    IndexAsesorComponent,
    IndexPersonaComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    NgxCaptchaModule, //recaptcha
    FormsModule, //trser la informacion del formulario
    ReactiveFormsModule//ejecutar tiempo real dentro del front end con cambios en el backend
    
  ]
})
export class AdministracionModule { }
