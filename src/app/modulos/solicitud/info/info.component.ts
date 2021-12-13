import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPersonas } from 'src/app/modelos/personas.modelo';
import { ModeloSolicitud } from 'src/app/modelos/solicitud.modelo';
import { ModeloVehiculo } from 'src/app/modelos/vehiculo.modelo';
import { PersonasService } from 'src/app/servicios/personas.service';
import { SolicitudesService } from 'src/app/servicios/solicitudes.service';
import { VehiculosService } from 'src/app/servicios/vehiculos.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  idSolicitud:string="";/*variable para guardar el id que viene del backend */
  informacionSolicitud: ModeloSolicitud = new ModeloSolicitud;
  informacionPersona: ModeloPersonas = new ModeloPersonas;
  informacionVehiculo: ModeloVehiculo = new ModeloVehiculo;


  constructor(
    private servicioSolicitud: SolicitudesService,//traer el objeto tipo vehiculo de Servicios/vehiculosService
    private router: Router, //este redireciona a otra pagina
    private route:ActivatedRoute,//se inyecta para poder sacar el id que viene desde el backen
    private servicioPersona: PersonasService,
    private servicioVehiculo: VehiculosService

  ) { }

  ngOnInit(): void {
    this.idSolicitud= this.route.snapshot.params["id"];//con este comando entrega el id
    this.BuscarSolicitud();
  }

  BuscarSolicitud(){
    this.servicioSolicitud.BuscarSolicitudPorId(this.idSolicitud).subscribe((datos:ModeloSolicitud)=>{
      
      this.informacionSolicitud.id=this.idSolicitud;
      this.informacionSolicitud.departamento=datos.departamento;
      this.informacionSolicitud.ciudad=datos.ciudad;
      this.informacionSolicitud.direccion=datos.direccion;
      this.informacionSolicitud.tipo=datos.tipo;
      let idC:any = this.informacionSolicitud.personaId=datos.personaId;
      let idV:any=this.informacionSolicitud.vehiculoId=datos.vehiculoId;
      this.informacionSolicitud.contratoAceptado=datos.contratoAceptado;
      this.informacionSolicitud.contratoCargado=datos.contratoCargado;


      this.servicioPersona.BuscarPersonaPorId(idC).subscribe((persona: ModeloPersonas) => {
        this.informacionPersona.id = persona.id;
        this.informacionPersona.nombres = persona.nombres;
        this.informacionPersona.apellidos = persona.apellidos;
        this.informacionPersona.rol = persona.rol;
        this.informacionPersona.correoElectronico = persona.correoElectronico;
        this.informacionPersona.celular = persona.celular;
      });

      this.servicioVehiculo.BuscarVehiculoPorId(idV).subscribe((vehiculo: ModeloVehiculo) => {
        this.informacionVehiculo.id = vehiculo.id;
        this.informacionVehiculo.marca = vehiculo.marca;
        this.informacionVehiculo.modelo = vehiculo.modelo;
        this.informacionVehiculo.video = vehiculo.video;
        this.informacionVehiculo.precio = vehiculo.precio;
        this.informacionVehiculo.foto = vehiculo.foto;
      });

    },(error:any)=>{
      alert("el cliente no existe en la base de datos");
    })
  }
}
