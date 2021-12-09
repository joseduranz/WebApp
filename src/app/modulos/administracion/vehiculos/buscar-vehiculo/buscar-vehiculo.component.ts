import { Component, OnInit } from '@angular/core';
import { ModeloVehiculo } from 'src/app/modelos/vehiculo.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { VehiculosService } from 'src/app/servicios/vehiculos.service';

@Component({
  selector: 'app-buscar-vehiculo',
  templateUrl: './buscar-vehiculo.component.html',
  styleUrls: ['./buscar-vehiculo.component.css']
})
export class BuscarVehiculoComponent implements OnInit {

  listadoVehiculos:ModeloVehiculo[]=[];

  constructor(private servicioVehiculo: VehiculosService) { }

  ngOnInit(): void {
    this.ObtenerListadoVehiculos();
  }

  ObtenerListadoVehiculos(){
    this.servicioVehiculo.ObtenerTodosVehiculos().subscribe((datos:ModeloVehiculo[])=>{
       this.listadoVehiculos = datos;
    })
  }

}

          