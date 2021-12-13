import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloSolicitud } from 'src/app/modelos/solicitud.modelo';
import { SolicitudesService } from 'src/app/servicios/solicitudes.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  id:string="";/*variable para guardar el id que viene del backend */
  personaId?:string="";
  vehiculoId?:string="";
  
  fgValidador:FormGroup=this.fb.group({
    'id':['', [Validators.required]],
    'direccion':['', [Validators.required]],
    'ciudad':['', [Validators.required]],
    'departamento':['', [Validators.required]],
    'contratoAceptado':['', [Validators.required]],
    'contratoCargado':['', [Validators.required]],    
    'tipo':['', [Validators.required]],
    'personaId':['', [Validators.required]],
    'vehiculoId':['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder, //validar formulario y llevarlo al post
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
      this.fgValidador.controls['direccion'].setValue(datos.direccion);
      this.fgValidador.controls['ciudad'].setValue(datos.ciudad);
      this.fgValidador.controls['departamento'].setValue(datos.departamento);
      this.fgValidador.controls['tipo'].setValue(datos.tipo);
      this.fgValidador.controls['contratoAceptado'].setValue(datos.contratoAceptado);
      this.fgValidador.controls['contratoCargado'].setValue(datos.contratoCargado);
      this.fgValidador.controls['personaId'].setValue(datos.personaId);
      this.fgValidador.controls['vehiculoId'].setValue(datos.vehiculoId);
      this.personaId=datos.personaId;
      this.vehiculoId=datos.vehiculoId;

    },(error:any)=>{
      alert("la solicitu no existe en la base de datos");
    })
  }
  
  EditarSolicitud(){
    
    let id = this.fgValidador.controls['id'].value;
    let direccion = this.fgValidador.controls['direccion'].value;
    let ciudad = this.fgValidador.controls['ciudad'].value;
    let departamento = this.fgValidador.controls['departamento'].value;
    let tipo = this.fgValidador.controls['tipo'].value;
    let contratoAceptado = this.fgValidador.controls['contratoAceptado'].value;
    let contratoCargado = this.fgValidador.controls['contratoCargado'].value;


    let solicitud= new ModeloSolicitud();
    solicitud.id=id;
    solicitud.direccion=direccion;
    solicitud.ciudad=ciudad;
    solicitud.departamento=departamento;
    solicitud.tipo=tipo;
    solicitud.contratoCargado=contratoCargado;
    solicitud.contratoAceptado=contratoAceptado;
    solicitud.personaId=this.personaId;
    solicitud.vehiculoId=this.vehiculoId;


    this.servicioSolicitud.ActualizarSolicitud(solicitud).subscribe((datos:ModeloSolicitud)=>{
      alert("la información fue actualizada exitosamente!!");
  
        this.router.navigate([`/solicitud/info-solicitud/${id}`])
      

    },(error:any)=>{
        alert("error No se pudo realizar la actualización");
      })
  }

}
