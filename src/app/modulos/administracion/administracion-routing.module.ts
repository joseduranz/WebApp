import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarAdministradorComponent } from './administrador/buscar-administrador/buscar-administrador.component';
import { CrearAdministradorComponent } from './administrador/crear-administrador/crear-administrador.component';
import { EditarAdministradorComponent } from './administrador/editar-administrador/editar-administrador.component';
import { EliminarAdministradorComponent } from './administrador/eliminar-administrador/eliminar-administrador.component';
import { IndexAdministradorComponent } from './administrador/index-administrador/index-administrador.component';
import { BuscarAsesorComponent } from './asesor/buscar-asesor/buscar-asesor.component';
import { CrearAsesorComponent } from './asesor/crear-asesor/crear-asesor.component';
import { EditarAsesorComponent } from './asesor/editar-asesor/editar-asesor.component';
import { EliminarAsesorComponent } from './asesor/eliminar-asesor/eliminar-asesor.component';
import { IndexAsesorComponent } from './asesor/index-asesor/index-asesor.component';
import { BuscarPersonaComponent } from './personas/buscar-persona/buscar-persona.component';
import { CrearPersonaComponent } from './personas/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './personas/editar-persona/editar-persona.component';
import { EliminarPersonaComponent } from './personas/eliminar-persona/eliminar-persona.component';
import { IndexPersonaComponent } from './personas/index-persona/index-persona.component';
import { BuscarVehiculoComponent } from './vehiculos/buscar-vehiculo/buscar-vehiculo.component';
import { CrearVehiculoComponent } from './vehiculos/crear-vehiculo/crear-vehiculo.component';
import { EditarVehiculoComponent } from './vehiculos/editar-vehiculo/editar-vehiculo.component';
import { EliminarVehiculoComponent } from './vehiculos/eliminar-vehiculo/eliminar-vehiculo.component';
import { InformacionComponent } from './vehiculos/informacion/informacion.component';

const routes: Routes = [  
  //=====PERSONAS========//
  {//INDEX PERSONA
    path:"index-cliente/:id",
    component:IndexPersonaComponent
  },
  {//BUSCAR PERSONA
    path:"buscar-cliente",
    component:BuscarPersonaComponent
  },
  {//CREAR PERSONA
    path:"registrar-cliente",
    component:CrearPersonaComponent
  },  
  {//EDITAR PERSONA
    path:"actualizar-cliente/:id", 
    component:EditarPersonaComponent
  },
  {//ELIMINAR PERSONA
    path:"eliminar-cliente/:id",
    component:EliminarPersonaComponent
  },
  //=====ASESOR========//
  {//INDEX ASESOR
    path:"index-asesor",
    component:IndexAsesorComponent
  },
  {//BUSCAR ASESOR
    path:"buscar-asesor",
    component:BuscarAsesorComponent
  },
  {//CREAR ASESOR
    path:"registrar-asesor",
    component:CrearAsesorComponent
  },  
  {//EDITAR ASESOR
    path:"actualizar-asesor/:id", 
    component:EditarAsesorComponent
  },
  {//ELIMINAR ASESOR
    path:"eliminar-asesor/:id",
    component:EliminarAsesorComponent
  },
  //=====ADMINISTRADORES========//
  {//INDEX ADMINISTRADOR
    path:"index-admin",
    component:IndexAdministradorComponent
  },
  {//BUSCAR ADMINISTRADOR
    path:"buscar-admin",
    component:BuscarAdministradorComponent
  },
  {//CREAR ADMINISTRADOR
    path:"registrar-admin",
    component:CrearAdministradorComponent
  },  
  {//EDITAR ADMINISTRADOR
    path:"actualizar-admin/:id", 
    component:EditarAdministradorComponent
  },
  {//ELIMINAR ADMINISTRADOR
    path:"eliminar-admin/:id",
    component:EliminarAdministradorComponent
  },
  //=====VEHICULOS========//
  {//BUSCAR vehiculo
    path:"buscar-vehiculo",
    component:BuscarVehiculoComponent
  },
  {//CREAR vehicuo
    path:"registrar-vehiculo",
    component:CrearVehiculoComponent
  },  
  {//EDITAR vehiculo
    path:"actualizar-vehiculo/:id", 
    component:EditarVehiculoComponent
  },
  {//ELIMINAR vehiculo
    path:"eliminar-vehiculo/:id",
    component:EliminarVehiculoComponent
  },
  
  {//INFORMACION vehiculo
    path:"informacion-vehiculo/:id",
    component:InformacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
