import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent implements OnInit {

  //se inyecta en el constructor dos variable, la primera que elimina los datso de la sesion y la segunda que redirecciona a otra ruta especificada 
  constructor(private servicioSeguridad: SeguridadService, private router:Router) { }

  ngOnInit(): void {//da prioridad a las instruciones
    this.servicioSeguridad.EliminarInformacionSesion();//elimina la sesion
    this.router.navigate(["/inicio"]);
  }

}
