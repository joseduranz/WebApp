import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-crear-asesor',
  templateUrl: './crear-asesor.component.html',
  styleUrls: ['./crear-asesor.component.css']
})
export class CrearAsesorComponent implements OnInit {

  //se crea una variable de clase FormGroup para generar esas validaciones
  formularioRegistro = new FormGroup({/*se instancia rn un formGrup  */
    //vriable/clase formControl/valor vacido/no puede estar vacido al enviar/maximos carecter 10
    nombres : new FormControl('',[Validators.required, Validators.maxLength(20)]), // si queremos que el input traiga un valor por defecto es de esta forma FormControl("Nombres del asesor")
    apellidos : new FormControl('',[Validators.required, Validators.maxLength(20)]),
    email : new FormControl('',[Validators.required, Validators.email]),
    celular : new FormControl('',[Validators.required]),
    direccion : new FormControl('',[Validators.required]),    
    terminoCondiciones : new FormControl('',[Validators.required]),
    captcha: new FormControl('', [Validators.required])
  });
  
  siteKey:string;//llave de captcha

  constructor(private router:Router) { 
    this.siteKey = '6LdwKGUdAAAAAMC0Y5gS7570bte16ti5WPCPalWJ';
  }

  ngOnInit(): void {
  }

  //con este metodo se obtiene en tiempo real el valor de formgroup nombre
  Nombres(){//el get lo que me permite es no darle parenesis al final del metodo
    return this.formularioRegistro.get('nombres');
  }  
  Apellidos(){//el get lo que me permite es no darle parenesis al final del metodo
    return this.formularioRegistro.get('apellidos');
  }
  Email(){//el get lo que me permite es no darle parenesis al final del metodo
    return this.formularioRegistro.get('email');
  }
  Celular(){//el get lo que me permite es no darle parenesis al final del metodo
    return this.formularioRegistro.get('celular');
  }
  Direccion(){//el get lo que me permite es no darle parenesis al final del metodo
    return this.formularioRegistro.get('direccion');
  }

  RegistrarUsuario(){
    let nombres = this.formularioRegistro.controls['nombres'].value;
    let apellidos= this.formularioRegistro.controls['apellidos'].value;
    let email = this.formularioRegistro.controls['email'].value;
    let telefono= this.formularioRegistro.controls['celular'].value;
    let direccion = this.formularioRegistro.controls['direccion'].value;

    //si se guarda correctamente en la base de datos
    let url = `http://localhost:3000/personas`;
    
    let datos = {
      nombres:nombres,
      apellidos:apellidos,
      rol:"asesor",
      direccion:direccion,
      correoElectronico:email,
      celular:telefono
    }
      /// a travez del metodo fecht se envian los datos a la url declarada anteriormente, en un archivo json
    fetch (url, {
      method:'POST',
      body: JSON.stringify(datos),
      headers:{'Content-Type':'application/json'}
    }).then(res =>res.json()) //la respuesta que me envia desde la base de datos 
      .then(mensaje =>{
        console.log(mensaje) //mostrar en la consola de el navegador el mensaje
      })

      ///redireciona a la paguina indicada
      this.router.navigate(["/seguridad/login"]);
    }  

}
