import { Component, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

declare var menudesplegable: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  sesionIniciada?:boolean = false; //crear una variable de tipo buleano y inicializada en falso
  subs: Subscription = new Subscription();

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
      this.sesionIniciada = datos.estaIdentificado
    })
  }

  aparecerMenu(){//este metodo aparece el menu responsive al dar clicken la hamburgesa
    menudesplegable();
  }

}
