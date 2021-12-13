import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudRoutingModule } from './solicitud-routing.module';
import { GenerarSolicitudComponent } from './generar-solicitud/generar-solicitud.component';
import { BuscarComponent } from './buscar/buscar.component';
import { EliminarComponent } from './eliminar/eliminar.component';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { InfoComponent } from './info/info.component';
import { FormGroup, FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';


@NgModule({
  declarations: [
    GenerarSolicitudComponent,
    GenerarSolicitudComponent,
    BuscarComponent,
    EliminarComponent,
    ActualizarComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    SolicitudRoutingModule,
    FormsModule, //trser la informacion del formulario
    ReactiveFormsModule,
  ]
})
export class SolicitudModule { }
