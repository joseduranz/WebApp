import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { IdentificacionComponent } from './identificacion/identificacion.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';

const routes: Routes = [
  {//CAMBIO-CLAVE
    path:"cambiar-pasword",
    component:CambioClaveComponent
  },
  {//IDENTIFICACION
    path:"login",
    component:IdentificacionComponent
  },
  {//RECUPERAR-CLAVE
    path:"recuperar-pasword",
    component:RecuperarClaveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
