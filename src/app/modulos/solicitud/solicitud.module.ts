import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudRoutingModule } from './solicitud-routing.module';
import { GenerarSolicitudComponent } from './generar-solicitud/generar-solicitud.component';


@NgModule({
  declarations: [
    GenerarSolicitudComponent,
    GenerarSolicitudComponent
  ],
  imports: [
    CommonModule,
    SolicitudRoutingModule
  ]
})
export class SolicitudModule { }
