import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerarSolicitudComponent } from './generar-solicitud/generar-solicitud.component';

const routes: Routes = [
  {
    path:"generar-solicitud",
    component:GenerarSolicitudComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
