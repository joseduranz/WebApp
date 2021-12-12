import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPersonas } from 'src/app/modelos/personas.modelo';
import { PersonasService } from 'src/app/servicios/personas.service';

@Component({
  selector: 'app-index-persona',
  templateUrl: './index-persona.component.html',
  styleUrls: ['./index-persona.component.css']
})
export class IndexPersonaComponent implements OnInit {

  id:string="";/*variable para guardar el id que viene del backend */
  informacionPersona: ModeloPersonas = new ModeloPersonas;

  constructor(
    private servicioPersona: PersonasService,//traer el objeto tipo vehiculo de Servicios/vehiculosService
    private router: Router, //este redireciona a otra pagina
    private route:ActivatedRoute//se inyecta para poder sacar el id que viene desde el backen
  ) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.params["id"];//con este comando entrega el id
    this.BuscarCliente();
  }

  BuscarCliente(){
    this.servicioPersona.BuscarPersonaPorId(this.id).subscribe((datos:ModeloPersonas)=>{
      
      this.informacionPersona.id=this.id;
      this.informacionPersona.nombres=datos.nombres;
      this.informacionPersona.apellidos=datos.apellidos;
      this.informacionPersona.celular=datos.celular;
      this.informacionPersona.correoElectronico=datos.correoElectronico;
      this.informacionPersona.direccion=datos.direccion;
      this.informacionPersona.rol=datos.rol;

    },(error:any)=>{
      alert("el cliente no existe en la base de datos");
    })
  }


}
