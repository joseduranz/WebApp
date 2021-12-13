import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloSolicitud } from 'src/app/modelos/solicitud.modelo';
import { SolicitudesService } from 'src/app/servicios/solicitudes.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {

  id:string="";/*variable para guardar el id que viene del backend */
  informacionSolicitud: ModeloSolicitud = new ModeloSolicitud;

  fgValidador:FormGroup=this.fb.group({
    'id':['', [Validators.required]],

  });

  constructor(
    private fb: FormBuilder,
    private servicioSolicitud: SolicitudesService,//traer el objeto tipo vehiculo de Servicios/vehiculosService
    private router: Router, //este redireciona a otra pagina
    private route:ActivatedRoute//se inyecta para poder sacar el id que viene desde el backend
  ) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.params["id"];//con este comando entrega el id
    this.BuscarSolicitud();
  }

  BuscarSolicitud(){
    this.servicioSolicitud.BuscarSolicitudPorId(this.id).subscribe((datos:ModeloSolicitud)=>{
      this.fgValidador.controls['id'].setValue(datos.id);

    },(error:any)=>{
      alert("la solicitud no existe en la base de datos");
    })
  }

  EliminarSolicitud(){
    let eliminarConId = this.informacionSolicitud.id=this.id;

    this.servicioSolicitud.EliminacionSolicitud(eliminarConId).subscribe(()=>{
      alert("la solicitud fue eliminado de la base de datos exitosamente!!");
      this.router.navigate(["/solicitud/buscar-solicitud"])

    },(error:any)=>{
        alert("error No se pudo realizar la eliminacion");
      })
  }

}
