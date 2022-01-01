import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';
import { PersonasService } from 'src/app/servicios/personas.service';



declare var  gsapJava : any;


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})


export class InicioComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({ 
    'nombre': ['', [Validators.required]],
    'email': ['', [Validators.required]],
    'emailPrueba': ['', [Validators.required]],
    'telefono':['',[Validators.required]],
    'mensaje':['',[Validators.required]],
    //'captcha': ['', [Validators.required]]
  });

  modal=false;
  siteKey:string;

  constructor(
    private fb : FormBuilder,
    private servicioPersona:PersonasService
  ) { 
    this.siteKey = '6Lfn27EdAAAAAGjsfkhwTTcBBTE7NsM02buqj-29';
  
    
  }

  ngOnInit(): void {
    gsapJava();
  }
  
  FormularioEnvio() {
    let nombre = this.fgValidador.controls['nombre'].value;
    let email = this.fgValidador.controls['email'].value;
    let emailPrueba = this.fgValidador.controls['emailPrueba'].value;
    let telefono = this.fgValidador.controls['telefono'].value;
    let mensaje = this.fgValidador.controls['mensaje'].value;

    this.servicioPersona.ContactarPersona(nombre,email,emailPrueba,telefono,mensaje).subscribe((datos: any) => {
      this.modal=!this.modal
    },(error:any) =>{
      console.log(error)
    })
    
  }

  CerrarModal(){
    this.modal=!this.modal
  }



  elem = document.documentElement;
  FullScreen(){
    if(this.elem.requestFullscreen){
      this.elem.requestFullscreen();
    }
  }
  CloseFullScreen(){
    if(document.exitFullscreen){
      document.exitFullscreen();
    }
  }
}
