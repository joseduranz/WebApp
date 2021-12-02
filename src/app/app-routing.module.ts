import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './plantilla/error/error.component';
import { InicioComponent } from './plantilla/inicio/inicio.component';

const routes: Routes = [
  {
      path:"inicio",
      component:InicioComponent
  },
  {
    path:"",
    pathMatch:"full",
    redirectTo:"/inicio"
  },
  {
    path:"administracion",
    loadChildren:()=>import("./modulos/administracion/administracion.module").then(x =>x.AdministracionModule)
  },
  {
    path:"seguridad",
    loadChildren:()=>import("./modulos/seguridad/seguridad.module").then(x =>x.SeguridadModule)
  },
  {//genera error implementar o pregunrtar a la profesora
    path:"solicitud",
    loadChildren:()=>import("./modulos/solicitud/solicitud.module").then(x=>x.SolicitudModule)
  },
  {
    path:"**",
    component:ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
