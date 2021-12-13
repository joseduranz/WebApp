import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as cryptoJS from 'crypto-js';
import { Action } from 'rxjs/internal/scheduler/Action';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({ //comunicacion y request del backend y frontend
    'usuario': ['', [Validators.required, Validators.email, Validators.maxLength(30)]], //el campo valida si esta vacido , entonces lo pone requerido y si no lo estaentonces valida que sea de tipo email
    'clave': ['', [Validators.required, Validators.maxLength(10)]],
    'captcha': ['', [Validators.required]]
  });

  siteKey: string;//llave de captcha


  constructor(private fb: FormBuilder, private servicioSeguridad: SeguridadService, private router: Router) {
    this.siteKey = '6LdwKGUdAAAAAMC0Y5gS7570bte16ti5WPCPalWJ';
  }

  ngOnInit(): void {

  }
  Email() {//el get lo que me permite es no darle parenesis al final del metodo
    return this.fgValidador.get('usuario');
  }
  Clave() {//el get lo que me permite es no darle parenesis al final del metodo
    return this.fgValidador.get('clave');
  }

  IdentificarUsuario() {
    let usuario = this.fgValidador.controls['usuario'].value;
    let clave = this.fgValidador.controls['clave'].value;
    let claveCifrada = cryptoJS.MD5(clave).toString();//codificar la clave   
    this.servicioSeguridad.Identificar(usuario, claveCifrada).subscribe((datos: any) => {
      //si todo funciona correctamente
      //alert("el usuario existe en la base de datos");
      this.servicioSeguridad.AlmacenarSesion(datos);
      ///implementar validacion de el rol
      let validarRol = this.servicioSeguridad.ObtenerRol();
      if (validarRol.datos.rol == "Admin") {
        this.router.navigate(["/administracion/index-admin"]); //Admin}
      }else if (validarRol.datos.rol == "cliente") {
        this.router.navigate(["/administracion/index-asesor"]); //Asesor
      }else {
        this.router.navigate(["/administracion/buscar-vehiculo"]);// cliente//se inyecta en el constructor y aca se hace el llamado
      }; (error: any) => {
        alert("el usuario o contraseña incorrecta");
      }
    })
  }
  

}
