import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloVehiculo } from 'src/app/modelos/vehiculo.modelo';
import { VehiculosService } from 'src/app/servicios/vehiculos.service';
import { Subscriber, Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitudesService } from 'src/app/servicios/solicitudes.service';
import { ModeloSolicitud } from 'src/app/modelos/solicitud.modelo';


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css'],
  
})
export class InformacionComponent implements OnInit {
  
  id:string="";/*variable para guardar el id que viene del backend */
  informacionVehiculo: ModeloVehiculo = new ModeloVehiculo;
  subs: Subscription = new Subscription();
  idCliente?:string;
  sesionCliente?:boolean = false;

  fgValidador: FormGroup =this.fb.group({
    'direccion':['', [Validators.required]],
    'ciudad':['', [Validators.required]],
    'departamento':['', [Validators.required]],
    'tipo':['', [Validators.required]],
  })


  constructor(
    private fb: FormBuilder,
    private servicioSolicitud: SolicitudesService,
    private servicioVehiculo: VehiculosService,//traer el objeto tipo vehiculo de Servicios/vehiculosService
    private router: Router, //este redireciona a otra pagina
    private route:ActivatedRoute,//se inyecta para poder sacar el id que viene desde el backen
    private servicioSeguridad : SeguridadService
  ) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.params["id"];//con este comando entrega el id
    this.BuscarVehiculo();
    this.idCliente= this.servicioSeguridad.ObtenerRol().datos.id;
    this.subs=this.servicioSeguridad.ObtenerDatosUsuarioSesion().subscribe((datos:ModeloIdentificar)=>{
      this.sesionCliente = datos.inicioCliente;
    })
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
  
  GenerarSolicitud(){
 
    let direccion = this.fgValidador.controls['direccion'].value;
    let ciudad = this.fgValidador.controls['ciudad'].value;
    let departamento = this.fgValidador.controls['departamento'].value;
    let tipo = this.fgValidador.controls['tipo'].value;


    let solicitud= new ModeloSolicitud();
    solicitud.direccion=direccion;
    solicitud.ciudad=ciudad;
    solicitud.departamento=departamento;
    solicitud.tipo=tipo;
    solicitud.vehiculoId=this.id;
    solicitud.personaId=this.idCliente;
    solicitud.contratoCargado="pendiente";
    solicitud.contratoAceptado="pendiente"
    
    console.log(solicitud.direccion);
    console.log(solicitud.ciudad);
    console.log(solicitud.departamento);
    console.log(solicitud.tipo);
    console.log(solicitud.vehiculoId);
    console.log(solicitud.personaId);



    this.servicioSolicitud.CrearSolicitud(solicitud).subscribe((ModeloSolicitud)=>{
      alert("su solicitud ha sido generada!!");
      this.router.navigate(["/administracion/buscar-vehiculo"])

    },(error:any)=>{
        alert("error generando la solicitud");
      })
  }

}
