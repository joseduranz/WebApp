import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { ModeloVehiculo } from 'src/app/modelos/vehiculo.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { VehiculosService } from 'src/app/servicios/vehiculos.service';

@Component({
  selector: 'app-buscar-vehiculo',
  templateUrl: './buscar-vehiculo.component.html',
  styleUrls: ['./buscar-vehiculo.component.css']
})
export class BuscarVehiculoComponent implements OnInit {

  sesionIniciada?:boolean = false; //crear una variable de tipo buleano y inicializada en falso
  sesionAdmin?:boolean = false
  sesionAsesor?:boolean = false
  sesionCliente?:boolean = false
  subs: Subscription = new Subscription();
  rol?:string;

  listadoVehiculos:ModeloVehiculo[]=[];

  constructor(private servicioVehiculo: VehiculosService,
    private servicioSeguridad : SeguridadService) { }

  ngOnInit(): void {
    this.ObtenerListadoVehiculos();
    this.subs=this.servicioSeguridad.ObtenerDatosUsuarioSesion().subscribe((datos:ModeloIdentificar)=>{
      /*atravez del metodo if
      if(datos){
        this.sesionIniciada = true;
      }else{
        this.sesionIniciada = false;
      }*/
      //atraves de 
      this.sesionIniciada = datos.estaIdentificado;
      this.sesionAdmin = datos.inicioAdmin;
      
      this.sesionAdmin = datos.inicioAdmin;
      this.sesionAsesor = datos.inicioAsesor;
      this.sesionCliente = datos.inicioCliente;

      this.rol= this.servicioSeguridad.ObtenerRol().datos.rol;

    })
  }

  ObtenerListadoVehiculos(){
    this.servicioVehiculo.ObtenerTodosVehiculos().subscribe((datos:ModeloVehiculo[])=>{
       this.listadoVehiculos = datos;
    })
  }

}

          