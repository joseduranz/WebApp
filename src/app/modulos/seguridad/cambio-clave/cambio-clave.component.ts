import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import * as cryptoJS from 'crypto-js';
import { ModeloCambiarClave } from 'src/app/modelos/cambiarClave.modelo';
import { ModeloDatos } from 'src/app/modelos/datos.modelo';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { ModeloPersonas } from 'src/app/modelos/personas.modelo';
import { PersonasService } from 'src/app/servicios/personas.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.component.html',
  styleUrls: ['./cambio-clave.component.css']
})
export class CambioClaveComponent implements OnInit {
  
  
  id:string="";
  correo?:string="";
  clave:boolean=false;
  validar:boolean=false;
  modal:Boolean=false;
  modalErrorClave:Boolean=false;
  modalErrorClaveIncorrecta:Boolean=false;
  

  fgValidador:FormGroup=this.fb.group({
    'clavevieja': ['',[Validators.required]]
  })
  fgValidador2:FormGroup=this.fb.group({
    'claveNueva1': ['',[Validators.required]],
    'claveNueva2': ['',[Validators.required]],
  })

  constructor( 
    private fb : FormBuilder,
    private servicioPersona: PersonasService,
    private router: Router,
    private route:ActivatedRoute,
    private servicioSeguridad: SeguridadService,

  ) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.params["id"];
    this.BuscarCliente()
    
  }

  BuscarCliente(){
    this.servicioPersona.BuscarPersonaPorId(this.id).subscribe((datos:ModeloPersonas)=>{
      this.correo=datos.correoElectronico;
    },(error:any)=>{
      console.log(error)
    })
  }


 AutenticarClave() {
    let usuario:any = this.correo;
    let clave = this.fgValidador.controls['clavevieja'].value;
    let claveCifrada = cryptoJS.MD5(clave).toString();//codificar la clave 
 
      this.servicioSeguridad.Identificar(usuario, claveCifrada).subscribe((datos: ModeloIdentificar) => {
          this.clave=!this.clave
          this.validar = datos.estaIdentificado=true
        },(error: any) => {
          this.modalErrorClave=!this.modalErrorClave
        }) 
  }

  CambiarClave() {

    let claveNueva = this.fgValidador2.controls['claveNueva1'].value;
    let comparar = this.fgValidador2.controls['claveNueva2'].value; 
        
    if (claveNueva == comparar){
      let claveCifrada2 = cryptoJS.MD5(claveNueva).toString();//codificar la clave 
      this.servicioPersona.BuscarPersonaParaCambioDeClave(this.id).subscribe((datos:ModeloCambiarClave)=>{
      datos.contrasena=claveCifrada2
      this.servicioPersona.ActualizarPersona(datos).subscribe();
      this.clave=!this.clave;
      this.modal=!this.modal
      },(error:any)=>{
        alert("el cliente no existe en la base de datos");
      })   
    }else{
      this.modalErrorClaveIncorrecta=!this.modalErrorClaveIncorrecta
    }
  }
  CerrarModal(){
    this.modal=!this.modal
  }
  CerrarModal2(){
    this.modalErrorClave=!this.modalErrorClave
  }
  CerrarModal3(){
    this.modalErrorClaveIncorrecta=!this.modalErrorClaveIncorrecta
  }
}
