import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloPersonas } from 'src/app/modelos/personas.modelo';
import { PersonasService } from 'src/app/servicios/personas.service';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {

  fgValidador:FormGroup=this.fb.group({
    'correoElectronico':['', [Validators.required]],
    'captcha': ['', [Validators.required]]
  })

  siteKey: string;//llave de captcha

  constructor(
    private fb : FormBuilder,
    private router:Router,
    private servicioPersona: PersonasService
    ){ 

      this.siteKey = '6Lfn27EdAAAAAGjsfkhwTTcBBTE7NsM02buqj-29';
    }

  ngOnInit(): void {
  }

  //implementar
  BuscarCorreo(){
    let encontrado:boolean=false;
    let correoElectronico = this.fgValidador.controls['correoElectronico'].value;
    this.servicioPersona.ObtenerTodasPersonas().subscribe((personas:ModeloPersonas[]) =>{
      try {
        for(let p of personas){
          if(p.correoElectronico == correoElectronico){
            alert("Revisa tu correo electronico")
            this.servicioPersona.RecuperarClave(p).subscribe();
            this.router.navigate(["/seguridad/login"]);
            encontrado=true
            break
          }
        }
      } catch (error) {
        console.log(error)
      }
      if(!encontrado){
        alert("el usuario no existe en nuestra base de datos")
      }
    })
    
  }
}
