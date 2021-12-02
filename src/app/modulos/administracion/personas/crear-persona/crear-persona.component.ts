import { Component, OnInit } from '@angular/core';

declare var java: any;//se declara primero la variable
declare var funcion: any;
declare var validacion:any;

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  prueba(){
    validacion();
  }

}
