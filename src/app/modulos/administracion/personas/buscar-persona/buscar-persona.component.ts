import { Component, OnInit } from '@angular/core';
import { ModeloPersonas } from 'src/app/modelos/personas.modelo';
import { PersonasService } from 'src/app/servicios/personas.service';

@Component({
  selector: 'app-buscar-persona',
  templateUrl: './buscar-persona.component.html',
  styleUrls: ['./buscar-persona.component.css']
})
export class BuscarPersonaComponent implements OnInit {

  listadoClientes:ModeloPersonas[]=[];
  
  constructor(private servicioPersona: PersonasService) { }

  ngOnInit(): void {
    this.ObtenerListadoClientes();
  }
  ObtenerListadoClientes(){
    this.servicioPersona.ObtenerTodasPersonas().subscribe((datos:ModeloPersonas[])=>{
      for(let p of datos){
        let rol= p.rol?.toUpperCase();
        if(rol == "CLIENTE"){
          let personaCliente: ModeloPersonas = new ModeloPersonas;

          personaCliente.id=p.id;
          personaCliente.nombres=p.nombres;
          personaCliente.apellidos=p.apellidos;
          personaCliente.rol=p.rol; 
          personaCliente.correoElectronico=p.correoElectronico;

          this.listadoClientes.push(personaCliente)
        }
      }
      //this.listadoPersonas = datos
    })
  }

}
