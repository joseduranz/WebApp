import { Component, OnInit } from '@angular/core';
import { ModeloPersonas } from 'src/app/modelos/personas.modelo';
import { PersonasService } from 'src/app/servicios/personas.service';

@Component({
  selector: 'app-buscar-administrador',
  templateUrl: './buscar-administrador.component.html',
  styleUrls: ['./buscar-administrador.component.css']
})
export class BuscarAdministradorComponent implements OnInit {
  
  listadoAsesores:ModeloPersonas[]=[];

  constructor(private servicioPersona: PersonasService) { }

  ngOnInit(): void {
    this.ObtenerListadoAdmin();
  }
  ObtenerListadoAdmin(){
    this.servicioPersona.ObtenerTodasPersonas().subscribe((datos:ModeloPersonas[])=>{
      for(let p of datos){
        let rol= p.rol?.toUpperCase();
        if(rol == "ADMIN"){
          let personaCliente: ModeloPersonas = new ModeloPersonas;

          personaCliente.id=p.id;
          personaCliente.nombres=p.nombres;
          personaCliente.apellidos=p.apellidos;
          personaCliente.rol=p.rol; 
          personaCliente.correoElectronico=p.correoElectronico;

          this.listadoAsesores.push(personaCliente)
        }
      }
      //this.listadoPersonas = datos
    })
  }

}
