import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { ModeloPersonas } from 'src/app/modelos/personas.modelo';
import { PersonasService } from 'src/app/servicios/personas.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';


@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {


  fgValidadorRegistrar: FormGroup =this.fb.group({ 
    'nombres':['',[Validators.required]], //el campo valida si esta vacido , entonces lo pone requerido 
    'apellidos':['',[Validators.required]],
    'email':['',[Validators.required, Validators.email]], //el campo valida si esta vacido , entonces lo pone requerido y si no lo estaentonces valida que sea de tipo email
    'telefono' :['',[Validators.required]],
    'direccion' :['',[Validators.required]],
    'terminoCondiciones' :['',[Validators.required]],
    'captcha':['', [Validators.required]],
    //'documentoId':['',[Validators.required]]// activar
  });
  
  sesionCliente?:boolean = false
  subs: Subscription = new Subscription();
  siteKey:string;//llave de captcha
  
  constructor(private fb: FormBuilder, private router:Router,private servicioPersona: PersonasService,private servicioSeguridad : SeguridadService) {
    this.siteKey = '6Lfn27EdAAAAAGjsfkhwTTcBBTE7NsM02buqj-29';

   }

  ngOnInit(): void {
    this.subs=this.servicioSeguridad.ObtenerDatosUsuarioSesion().subscribe((datos:ModeloIdentificar)=>{
      this.sesionCliente = datos.inicioCliente;
    })
  } 
  
  //con este metodo se obtiene en tiempo real el valor de formgroup nombre
  Nombres(){//el get lo que me permite es no darle parenesis al final del metodo
    return this.fgValidadorRegistrar.get('nombres');
  }  
  Apellidos(){//el get lo que me permite es no darle parenesis al final del metodo
    return this.fgValidadorRegistrar.get('apellidos');
  }
  Email(){//el get lo que me permite es no darle parenesis al final del metodo
    return this.fgValidadorRegistrar.get('email');
  }
  Celular(){//el get lo que me permite es no darle parenesis al final del metodo
    return this.fgValidadorRegistrar.get('telefono');
  }
  Direccion(){//el get lo que me permite es no darle parenesis al final del metodo
    return this.fgValidadorRegistrar.get('direccion');
  }
  //DocumentoId(){//el get lo que me permite es no darle parenesis al final del metodo
   // return this.fgValidadorRegistrar.get('documentoId');
  //}

  //registro usuario metodo
  RegistrarUsuario(){
    let buscarCorreo:boolean=false;
    let nombres = this.fgValidadorRegistrar.controls['nombres'].value;
    let apellidos= this.fgValidadorRegistrar.controls['apellidos'].value;
    let email = this.fgValidadorRegistrar.controls['email'].value;
    let telefono= this.fgValidadorRegistrar.controls['telefono'].value;
    let direccion = this.fgValidadorRegistrar.controls['direccion'].value;
    //let documentoId = this.fgValidadorRegistrar.controls['documentoId'].value;

    //si se guarda correctamente en la base de datos
    //let url = `https://autoluxuryb.herokuapp.com/personas`;
    let url = `http://localhost:3000/personas`;
    
    let datos = {
      nombres:nombres,
      apellidos:apellidos,
      rol:"cliente",
      direccion:direccion,
      correoElectronico:email,
      celular:telefono,
    }

    // fetch (url, {
    //   method:'POST',
    //   body: JSON.stringify(datos),
    //   headers:{'Content-Type':'application/json'}
    // }).then(res =>res.json()) //la respuesta que me envia desde la base de datos 
    //   .then(mensaje =>{
    //     console.log(mensaje) //mostrar en la consola de el navegador el mensaje
    //   })
    //   alert(`por favor abre tu correo ${email} e inicia sesión con los datos que allí se sumunistran`)
    //   //redireciona a la paguina indicada
    //   this.router.navigate(["/seguridad/login"]);

      try {
        this.servicioPersona.ObtenerTodasPersonas().subscribe((personasBuscar:ModeloPersonas[])=>{
          for(let p of personasBuscar){
            if(p.correoElectronico == datos.correoElectronico){
              alert("el usuario ya esta registrado en nuestra base de datos");              
              buscarCorreo=true;
              break;
            }
          }if(!buscarCorreo){
            this.servicioPersona.CrearPersona(datos).subscribe();
            alert("revisa tu correo electrónico");
            ///redireciona a la paguina indicada
            this.router.navigate(["/seguridad/login"]);
          } 
        })  
      } catch (error) {
        console.log(error)
      }
     
  }  
    

}
