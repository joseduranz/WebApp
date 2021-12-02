import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarPersonaComponent } from './personas/buscar-persona/buscar-persona.component';
import { CrearPersonaComponent } from './personas/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './personas/editar-persona/editar-persona.component';
import { EliminarPersonaComponent } from './personas/eliminar-persona/eliminar-persona.component';
import { BuscarVehiculoComponent } from './vehiculos/buscar-vehiculo/buscar-vehiculo.component';
import { CrearVehiculoComponent } from './vehiculos/crear-vehiculo/crear-vehiculo.component';
import { EditarVehiculoComponent } from './vehiculos/editar-vehiculo/editar-vehiculo.component';
import { EliminarVehiculoComponent } from './vehiculos/eliminar-vehiculo/eliminar-vehiculo.component';

const routes: Routes = [  
  //=====PERSONAS========//
  {//BUSCAR PERSONA
    path:"buscar",
    component:BuscarPersonaComponent
  },
  {//CREAR PERSONA
    path:"registrar",
    component:CrearPersonaComponent
  },  
  {//EDITAR PERSONA
    path:"actualizar", 
    component:EditarPersonaComponent
  },
  {//ELIMINAR PERSONA
    path:"eliminar",
    component:EliminarPersonaComponent
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
    path:"actualizar-vehiculo", 
    component:EditarVehiculoComponent
  },
  {//ELIMINAR vehiculo
    path:"eliminar-vehiculo",
    component:EliminarVehiculoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
