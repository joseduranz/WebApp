import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPersonas } from 'src/app/modelos/personas.modelo';
import { PersonasService } from 'src/app/servicios/personas.service';

@Component({
  selector: 'app-eliminar-asesor',
  templateUrl: './eliminar-asesor.component.html',
  styleUrls: ['./eliminar-asesor.component.css']
})
export class EliminarAsesorComponent implements OnInit {

  id:string="";/*variable para guardar el id que viene del backend */
  informacionPersna: ModeloPersonas = new ModeloPersonas;

  fgValidador:FormGroup=this.fb.group({
    'id':['', [Validators.required]],

  });

  constructor(

    private fb: FormBuilder,
    private servicioPersona: PersonasService,//traer el objeto tipo vehiculo de Servicios/vehiculosService
    private router: Router, //este redireciona a otra pagina
    private route:ActivatedRoute//se inyecta para poder sacar el id que viene desde el backend

  ) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.params["id"];//con este comando entrega el id
    this.BuscarPersona();
  }
  BuscarPersona(){
    this.servicioPersona.BuscarPersonaPorId(this.id).subscribe((datos:ModeloPersonas)=>{
      this.fgValidador.controls['id'].setValue(datos.id);

    },(error:any)=>{
      alert("el Asesor no existe en la base de datos");
    })
  }

  EliminarPersona(){
    let eliminarConId = this.informacionPersna.id=this.id;

    this.servicioPersona.EliminacionPersona(eliminarConId).subscribe(()=>{
      alert("el Asesor fue eliminado de la base de datos exitosamente!!");
      this.router.navigate(["/administracion/buscar-asesor"])

    },(error:any)=>{
        alert("error No se pudo realizar la eliminacion");
      })
  }

}
