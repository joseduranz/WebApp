import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloVehiculo } from 'src/app/modelos/vehiculo.modelo';
import { VehiculosService } from 'src/app/servicios/vehiculos.service';


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  
  id:string="";/*variable para guardar el id que viene del backend */
  informacionVehiculo: ModeloVehiculo = new ModeloVehiculo;

  constructor(
    private servicioVehiculo: VehiculosService,//traer el objeto tipo vehiculo de Servicios/vehiculosService
    private router: Router, //este redireciona a otra pagina
    private route:ActivatedRoute//se inyecta para poder sacar el id que viene desde el backen
  ) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.params["id"];//con este comando entrega el id
    this.BuscarVehiculo();
  }

  BuscarVehiculo(){
    this.servicioVehiculo.BuscarVehiculoPorId(this.id).subscribe((datos:ModeloVehiculo)=>{
      this.informacionVehiculo.id=this.id;
      this.informacionVehiculo.matricula=datos.matricula;
      this.informacionVehiculo.marca=datos.marca;
      this.informacionVehiculo.modelo=datos.modelo;
      this.informacionVehiculo.categoria=datos.categoria;
      this.informacionVehiculo.precio=datos.precio;
      this.informacionVehiculo.tipoOferta=datos.tipoOferta;
      this.informacionVehiculo.encargado=datos.encargado;
      this.informacionVehiculo.contactoEncargado=datos.contactoEncargado;
      this.informacionVehiculo.foto=datos.foto;
      this.informacionVehiculo.video=datos.video;
      this.informacionVehiculo.estado=datos.estado;

    },(error:any)=>{
      alert("la publicacion de el vehiculo no existe en la base de datos");
    })
  }

}
