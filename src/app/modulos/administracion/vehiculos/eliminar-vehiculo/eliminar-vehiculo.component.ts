import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloVehiculo } from 'src/app/modelos/vehiculo.modelo';
import { VehiculosService } from 'src/app/servicios/vehiculos.service';

@Component({
  selector: 'app-eliminar-vehiculo',
  templateUrl: './eliminar-vehiculo.component.html',
  styleUrls: ['./eliminar-vehiculo.component.css']
})
export class EliminarVehiculoComponent implements OnInit {

  id:string="";/*variable para guardar el id que viene del backend */
  informacionVehiculo: ModeloVehiculo = new ModeloVehiculo;

  fgValidador:FormGroup=this.fb.group({
    'id':['', [Validators.required]],

  });

  constructor(
    private fb: FormBuilder,
    private servicioVehiculo: VehiculosService,//traer el objeto tipo vehiculo de Servicios/vehiculosService
    private router: Router, //este redireciona a otra pagina
    private route:ActivatedRoute//se inyecta para poder sacar el id que viene desde el backend
  ) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.params["id"];//con este comando entrega el id
    this.BuscarVehiculo();
  }
  
  BuscarVehiculo(){
    this.servicioVehiculo.BuscarVehiculoPorId(this.id).subscribe((datos:ModeloVehiculo)=>{
      this.fgValidador.controls['id'].setValue(datos.id);

    },(error:any)=>{
      alert("la publicacion de el vehiculo no existe en la base de datos");
    })
  }
  EliminarVehiculo(){
    let eliminarConId = this.informacionVehiculo.id=this.id;

    this.servicioVehiculo.EliminacionVehiculo(eliminarConId).subscribe(()=>{
      alert("el vehiculo fue eliminado de la base de datos exitosamente!!");
      this.router.navigate(["/administracion/buscar-vehiculo"])

    },(error:any)=>{
        alert("error No se pudo realizar la eliminacion");
      })
  }
}
