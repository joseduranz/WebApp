import { Component, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

declare var Arrow:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {


  cerrar:boolean=true;
  sesionIniciada?:boolean = false; //crear una variable de tipo buleano y inicializada en falso
  sesionAdmin?:boolean = false
  sesionAsesor?:boolean = false
  sesionCliente?:boolean = false
  subs: Subscription = new Subscription();
  rol?:string = "";
  id?:string;
  nombre?:string;
  idSolicitud?:string;

  constructor(private servicioSeguridad : SeguridadService) { }

  ngOnInit(): void {
    this.subs=this.servicioSeguridad.ObtenerDatosUsuarioSesion().subscribe((datos:ModeloIdentificar)=>{
      /*atravez del metodo if
      if(datos){
        this.sesionIniciada = true;
      }else{
        this.sesionIniciada = false;
      }*/
      //atraves de 
      this.sesionIniciada = datos.estaIdentificado;
      this.sesionAdmin = datos.inicioAdmin;
      this.sesionAsesor = datos.inicioAsesor;
      this.sesionCliente = datos.inicioCliente;
      try {
        if(this.sesionIniciada){
          this.rol= this.servicioSeguridad.ObtenerRol().datos.rol;
          this.id= this.servicioSeguridad.ObtenerRol().datos.id;
          this.nombre= this.servicioSeguridad.ObtenerRol().datos.nombre;
          this.idSolicitud= this.servicioSeguridad.ObtenerRol().datos.idSolicitud;//implementar
        }
      } catch (error) {
        console.log(error);
      }
      
    })
    this.AparecerMenu();
  }
  cambiarVar(){
    this.cerrar = !this.cerrar;
  }
  cerrarMen() {
    if(!this.cerrar){
      document.querySelector("#sidebar")?.classList.toggle("close");
      this.cerrar = !this.cerrar;
    }
    
  }

  MostrarSubmenu0(){
    document.querySelector(".lista0")?.classList.toggle("show-menu");
  }
  MostrarSubmenu1(){
    document.querySelector(".lista1")?.classList.toggle("show-menu");
  }
  MostrarSubmenu2(){
    document.querySelector(".lista2")?.classList.toggle("show-menu");
  }
  MostrarSubmenu3(){
    document.querySelector(".lista3")?.classList.toggle("show-menu");
  }
  MostrarSubmenu4(){
    document.querySelector(".lista4")?.classList.toggle("show-menu");
  }
  MostrarSubmenu5(){
    document.querySelector(".lista5")?.classList.toggle("show-menu");
  }
  MostrarSubmenu6(){
    document.querySelector(".lista6")?.classList.toggle("show-menu");
  }
  MostrarSubmenu7(){
    document.querySelector(".lista7")?.classList.toggle("show-menu");
  }
  AparecerMenu(){
    let sidebar = document.querySelector(".sidebar")?.classList.toggle("close");
  }
  

}
