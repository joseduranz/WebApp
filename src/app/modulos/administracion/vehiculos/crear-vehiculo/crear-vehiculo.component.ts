import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloVehiculo } from 'src/app/modelos/vehiculo.modelo';
import { StorageService } from 'src/app/servicios/storage.service';
import { VehiculosService } from 'src/app/servicios/vehiculos.service';

@Component({
  selector: 'app-crear-vehiculo',
  templateUrl: './crear-vehiculo.component.html',
  styleUrls: ['./crear-vehiculo.component.css']
})
export class CrearVehiculoComponent implements OnInit {

  imagenes:any=[];
  url:any;
  modal:boolean=false;
  modal2:boolean=false;

  fgValidador: FormGroup =this.fb.group({
    'matricula':['', [Validators.required]],
    'marca':['', [Validators.required]],
    'modelo':['', [Validators.required]],
    'categoria':['', [Validators.required]],
    'precio':['', [Validators.required]],    
    'tipoOferta':['', [Validators.required]],
    'encargado':['', [Validators.required]],
    'contactoEncargado':['', [Validators.required]],
    'video':['', [Validators.required]],
    'estado':['', [Validators.required]]
  })

  constructor(private fb: FormBuilder, //validar formulario y llevarlo al post
    private servicioVehiculo: VehiculosService,//traer el objeto tipo vehiculo de Servicios/vehiculosService
    private router: Router, //este redireciona a otra pagina
    private guardarImg: StorageService
    ) { }

  ngOnInit(): void {
  }
  GuardarVehiculo(){
 
    let matricula = this.fgValidador.controls['matricula'].value;
    let marca = this.fgValidador.controls['marca'].value;
    let modelo = this.fgValidador.controls['modelo'].value;
    let categoria = this.fgValidador.controls['categoria'].value;
    let precio = parseInt(this.fgValidador.controls['precio'].value);
    let tipoOferta = this.fgValidador.controls['tipoOferta'].value;
    let encargado = this.fgValidador.controls['encargado'].value;
    let contactoEncargado = this.fgValidador.controls['contactoEncargado'].value;
    let foto = this.imagenes[0];
    let video = this.fgValidador.controls['video'].value;
    let estado = this.fgValidador.controls['estado'].value;


    let vehiculo= new ModeloVehiculo();
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


    this.servicioVehiculo.CrearVehiculo(vehiculo).subscribe((ModeloVehiculo)=>{
      this.modal=true;

    },(error:any)=>{
      this.modal2=!this.modal2;
      })
  }
  CargarImagen(event:any){
    //console.log(event.target.files);
    let archivos = event.target.files;//guarda la imagen que se carga
    let reader = new FileReader();//convierte el archivo en base64 que es un formato que admite firebase
    let nombre = "img-autoluxury"

    reader.readAsDataURL(archivos[0]);
    reader.onloadend = async () =>{
      //console.log(reader.result)
      this.imagenes.push(reader.result);
      try {
        
        await this.guardarImg.SubirImagen(nombre + "_" + Date.now(), reader.result).then(urlImagen =>{
        this.url=urlImagen;
        });
      } catch (error) {
        
      }
      console.log(this.url);
    }

  }
  CerrarModal(){
    this.modal=!this.modal
    this.router.navigate(["/administracion/buscar-vehiculo"])
  }
  CerrarModalError(){
    this.modal2=!this.modal2
  }

}
