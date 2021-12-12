import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { ModeloPersonas } from 'src/app/modelos/personas.modelo';
import { PersonasService } from 'src/app/servicios/personas.service';
@Component({
  selector: 'app-editar-asesor',
  templateUrl: './editar-asesor.component.html',
  styleUrls: ['./editar-asesor.component.css']
})
export class EditarAsesorComponent implements OnInit {
  
  id:string="";/*variable para guardar el id que viene del backend */

  fgValidador:FormGroup=this.fb.group({
    'id':['', [Validators.required]],
    'nombres':['', [Validators.required]],
    'apellidos':['', [Validators.required]],
    'rol':['', [Validators.required]],
    'direccion':['', [Validators.required]],
    'correoElectronico':['', [Validators.required]],    
    'celular':['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder, //validar formulario y llevarlo al post
    private servicioPersona: PersonasService,//traer el objeto tipo vehiculo de Servicios/vehiculosService
    private router: Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.params["id"];//con este comando entrega el id
    this.BuscarAsesor();
  }

  BuscarAsesor(){
    this.servicioPersona.BuscarPersonaPorId(this.id).subscribe((datos:ModeloPersonas)=>{
      
      this.fgValidador.controls['id'].setValue(datos.id);
      this.fgValidador.controls['nombres'].setValue(datos.nombres);
      this.fgValidador.controls['apellidos'].setValue(datos.apellidos);
      this.fgValidador.controls['correoElectronico'].setValue(datos.correoElectronico);
      this.fgValidador.controls['celular'].setValue(datos.celular);
      this.fgValidador.controls['direccion'].setValue(datos.direccion);
      this.fgValidador.controls['rol'].setValue(datos.rol);

    },(error:any)=>{
      alert("la publicacion de el vehiculo no existe en la base de datos");
    })
  }

  
  EditarAsesor(){
    
    let id = this.fgValidador.controls['id'].value;
    let nombres = this.fgValidador.controls['nombres'].value;
    let apellidos = this.fgValidador.controls['apellidos'].value;
    let rol = this.fgValidador.controls['rol'].value;
    let direccion = this.fgValidador.controls['direccion'].value;
    let correoElectronico = this.fgValidador.controls['correoElectronico'].value;
    let celular = this.fgValidador.controls['celular'].value;


    let persona= new ModeloPersonas();
    persona.id=id;
    persona.nombres=nombres;
    persona.apellidos=apellidos;
    persona.rol=rol;
    persona.direccion=direccion;
    persona.correoElectronico=correoElectronico;
    persona.celular=celular;


    this.servicioPersona.ActualizarPersona(persona).subscribe((datos:ModeloPersonas)=>{
      alert("el Asesor fue actualizado exitosamente!!");
      this.router.navigate(["/administracion/buscar-asesor"])

    },(error:any)=>{
        alert("error No se pudo realizar la actualización");
      })
  }

}
