import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  fgValidador: FormGroup =this.fb.group({ //comunicacion y request del backend y frontend
    'usuario':['',[Validators.required, Validators.email]], //el campo valida si esta vacido , entonces lo pone requerido y si no lo estaentonces valida que sea de tipo email
    'clave' :['',[Validators.required]],
    'captcha':['', [Validators.required]]
  });

  siteKey:string;//llave de captcha
  

  constructor(private fb: FormBuilder ) {
    this.siteKey = '6LdwKGUdAAAAAMC0Y5gS7570bte16ti5WPCPalWJ';
   }

  ngOnInit(): void {
    /*
    setInterval(() => {
      //ESTA CODIFICACION SIRVE PARA GENERAR REACTIVIDAD, QUE LOS VALORES CAMBIEN AUTOMATICAMENTE//      
      this.fgValidador.controls['usuario'].setValue(Math.random()*1000)
      },2000)
      this.fgValidador.controls['clave'].setValue('******');
      */  
  }
  IdentificarUsuario(){
    let usuario = this.fgValidador.controls['usuario'].value;
    let clave = this.fgValidador.controls['clave'].value;
    alert(usuario);
    alert(clave);
  }
  

}
