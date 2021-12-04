import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-asesor',
  templateUrl: './crear-asesor.component.html',
  styleUrls: ['./crear-asesor.component.css']
})
export class CrearAsesorComponent implements OnInit {

  //se crea una variable de clase FormGroup para generar esas validaciones
  formularioRegistro = new FormGroup({/*se instancia rn un formGrup  */
    //vriable/clase formControl/valor vacido/no puede estar vacido al enviar/maximos carecter 10
    nombres : new FormControl('',[Validators.required, Validators.maxLength(10)]), // si queremos que el input traiga un valor por defecto es de esta forma FormControl("Nombres del asesor")
    apellidos : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required, Validators.email]),
    celular : new FormControl('',[Validators.required]),
    direccion : new FormControl('',[Validators.required])
  });
  

  constructor() { }

  ngOnInit(): void {
  }

  //con este metodo se obtiene en tiempo real el valor de formgroup
  get Nombres(){//el get lo que me permite es no darle parenesis al final del metodo
    return this.formularioRegistro.get('nombres');
  }

  ///este metodo guarda la informacion
  Guardar(){
    //console.log(this.formularioRegistro.value);//retorna un json con todos los valores nombres,apellidos,email etc
    console.log(this.formularioRegistro.valid);//imprime que todos los campos sean validos y no esten vacios
    //this.nombre.setValue("Nombres del asesor");
  }

}
