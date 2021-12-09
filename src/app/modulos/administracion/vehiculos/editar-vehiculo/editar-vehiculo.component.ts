import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloVehiculo } from 'src/app/modelos/vehiculo.modelo';
import { VehiculosService } from 'src/app/servicios/vehiculos.service';

@Component({
  selector: 'app-editar-vehiculo',
  templateUrl: './editar-vehiculo.component.html',
  styleUrls: ['./editar-vehiculo.component.css']
})
export class EditarVehiculoComponent implements OnInit {

  id:string="";/*variable para guardar el id que viene del backend */
   
  fgValidador:FormGroup=this.fb.group({
    'id':['', [Validators.required]],
    'matricula':['', [Validators.required]],
    'marca':['', [Validators.required]],
    'modelo':['', [Validators.required]],
    'categoria':['', [Validators.required]],
    'precio':['', [Validators.required]],    
    'tipoOferta':['', [Validators.required]],
    'encargado':['', [Validators.required]],
    'contactoEncargado':['', [Validators.required]],
    'foto':['', [Validators.required]],
    'video':['', [Validators.required]],
    'estado':['', [Validators.required]]

  });
  
  constructor(private fb: FormBuilder, //validar formulario y llevarlo al post
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
      this.fgValidador.controls['matricula'].setValue(datos.matricula);
      this.fgValidador.controls['marca'].setValue(datos.marca);
      this.fgValidador.controls['modelo'].setValue(datos.modelo);
      this.fgValidador.controls['categoria'].setValue(datos.categoria);
      this.fgValidador.controls['precio'].setValue(datos.precio);
      this.fgValidador.controls['encargado'].setValue(datos.encargado);
      this.fgValidador.controls['tipoOferta'].setValue(datos.tipoOferta);
      this.fgValidador.controls['contactoEncargado'].setValue(datos.contactoEncargado);
      this.fgValidador.controls['foto'].setValue(datos.foto);
      this.fgValidador.controls['video'].setValue(datos.video);
      this.fgValidador.controls['estado'].setValue(datos.estado);

    },(error:any)=>{
      alert("la publicacion de el vehiculo no existe en la base de datos");
    })
  }

  EditarVehiculo(){
    
    let id = this.fgValidador.controls['id'].value;
    let matricula = this.fgValidador.controls['matricula'].value;
    let marca = this.fgValidador.controls['marca'].value;
    let modelo = this.fgValidador.controls['modelo'].value;
    let categoria = this.fgValidador.controls['categoria'].value;
    let precio = parseInt(this.fgValidador.controls['precio'].value);
    let tipoOferta = this.fgValidador.controls['tipoOferta'].value;
    let encargado = this.fgValidador.controls['encargado'].value;
    let contactoEncargado = this.fgValidador.controls['contactoEncargado'].value;
    let foto = this.fgValidador.controls['foto'].value;
    let video = this.fgValidador.controls['video'].value;
    let estado = this.fgValidador.controls['estado'].value;


    let vehiculo= new ModeloVehiculo();
    vehiculo.id=id;
    vehiculo.marca=marca;
    vehiculo.precio=precio;
    vehiculo.matricula=matricula;
    vehiculo.modelo=modelo;
    vehiculo.categoria=categoria;
    vehiculo.tipoOferta=tipoOferta;
    vehiculo.encargado=encargado;
    vehiculo.contactoEncargado=contactoEncargado;
    vehiculo.foto=foto;
    vehiculo.video=video;
    vehiculo.estado=estado;


    this.servicioVehiculo.ActualizarVehiculo(vehiculo).subscribe((datos:ModeloVehiculo)=>{
      alert("el vehiculo fue actualizado exitosamente!!");
      this.router.navigate(["/administracion/buscar-vehiculo"])

    },(error:any)=>{
        alert("error No se pudo realizar la actualización");
      })
  }

}