import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { BuscarComponent } from './buscar/buscar.component';
import { EliminarComponent } from './eliminar/eliminar.component';
import { GenerarSolicitudComponent } from './generar-solicitud/generar-solicitud.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  {
    path:"generar-solicitud",
    component:GenerarSolicitudComponent
  },
  {
    path:"info-solicitud/:id",
    component:InfoComponent
  },
  {
    path:"buscar-solicitud",
    component:BuscarComponent
  },
  {
    path:"actualizar-solicitud/:id",
    component:ActualizarComponent
  },
  {
    path:"eliminar-solicitud/:id",
    component:EliminarComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
