import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as cryptoJS from 'crypto-js';
import { Subscription } from 'rxjs/internal/Subscription';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
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
    'captcha': ['']
  });

  show: boolean = false;
  subs: Subscription = new Subscription();
  sesionIniciada?:boolean = false;
  siteKey: string;//llave de captcha
  modal=false;


  constructor(private fb: FormBuilder, private servicioSeguridad: SeguridadService, private router: Router) {
    this.siteKey = '6Lfn27EdAAAAAGjsfkhwTTcBBTE7NsM02buqj-29';
  }

  ngOnInit(): void {
    this.subs=this.servicioSeguridad.ObtenerDatosUsuarioSesion().subscribe((datos:ModeloIdentificar)=>{
      this.sesionIniciada = datos.estaIdentificado;
    })
  }

  password() {
    this.show = !this.show;
  }
  Email() {
    return this.fgValidador.get('usuario');
  }
  Clave() {
    return this.fgValidador.get('clave');
  }

  IdentificarUsuario() {
    let usuario = this.fgValidador.controls['usuario'].value;
    let clave = this.fgValidador.controls['clave'].value;
    let claveCifrada = cryptoJS.MD5(clave).toString();//codificar la clave   
    this.servicioSeguridad.Identificar(usuario, claveCifrada).subscribe((datos: any) => {
      //si todo funciona correctamente
      this.servicioSeguridad.AlmacenarSesion(datos);
      let nombre =this.servicioSeguridad.ObtenerRol().datos.nombre;
      alert(`Bienvenido ${nombre}`);
      ///implementar validacion de el rol
      let validarRol = this.servicioSeguridad.ObtenerRol();
      if (validarRol.datos.rol == "Admin") {
        this.router.navigate(["/administracion/index-admin"]); //Admin}
      }else if (validarRol.datos.rol == "asesor") {
        this.router.navigate(["/administracion/index-asesor"]); //Asesor
      }else {
        this.router.navigate(["/administracion/buscar-vehiculo"]);// cliente//se inyecta en el constructor y aca se hace el llamado
      }; (error: any) => {
        this.modal=!this.modal;
      }
    })
  }
  CerrarModal(){
    this.modal=!this.modal
  }
  

}
