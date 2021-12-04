import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as cryptoJS from 'crypto-js';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

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
  

  constructor(private fb: FormBuilder, private servicioSeguridad: SeguridadService, private router:Router ) {
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
    let claveCifrada = cryptoJS.MD5(clave).toString();//codificar la clave   
    this.servicioSeguridad.Identificar(usuario,claveCifrada).subscribe((datos:any)=>{
      //si todo funciona correctamente
        //alert("el usuario existe en la base de datos");
      this.servicioSeguridad.AlmacenarSesion(datos);
      ///implementar validacion de el rol
      //------------------------------------------- 
      //this.router.navigate(["/administracion/index-admin"]); //Admin
      //this.router.navigate(["/administracion/index-asesor"]); //Asesor
      this.router.navigate(["/administracion/index-cliente"]);// cliente//se inyecta en el constructor y aca se hace el llamado
    },(error:any)=>{
      //no funciona correctamente
      alert("el usuario o contraseña incorrecta");
    })
    /*alert(usuario);
    alert(clave);*/
  }
  

}
