import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModeloDatos } from '../modelos/datos.modelo';
import { ModeloIdentificar } from '../modelos/identificar.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  DatosUsuarioSesion = new BehaviorSubject <ModeloIdentificar>(new ModeloIdentificar());
  DatosUsuarioSesion2 = new BehaviorSubject <ModeloDatos>(new ModeloDatos());

  constructor(private http: HttpClient) { 
    this.verificarSesionActual();
  }
  /* metodos para validar el inicio y eliminacion de la informacion */
  //IDENTIFICA EL USUARIO EN LA BASE DE DATOS
  Identificar(Usuario: string, Clave: string):Observable<ModeloIdentificar>{
    //return this.http.post("http://localhost:3000/identificarPersona",
    return this.http.post("https://autoluxuryb.herokuapp.com/identificarPersona",{
      usuario:Usuario,
      clave:Clave,
    },
    {
      headers: new HttpHeaders(),
    })
  }
  //RESETEA DESPUES DE HABER ELIMINADO LOS DATOS DE LA SESION
  RefrescarDatosUsuarioSesion(datos: ModeloIdentificar){
    this.DatosUsuarioSesion.next(datos);
  }
  //RESETEA DESPUES DE HABER ELIMINADO LOS DATOS DE LA SESION 
  RefrescarDatosUsuarioSesion2(datos: ModeloDatos){
    this.DatosUsuarioSesion2.next(datos);
  }
  //OBTIENE LA INFORMACION DEL LOGIN GUARDADA EN EL NAVEGADOR
  ObtenerDatosUsuarioSesion(){
    return this.DatosUsuarioSesion.asObservable();
  }
  //VERIFICA SI HAY SESION GUARDADA EN EL NAVEGADOR
  verificarSesionActual(){
    let datos = this.ObtenerInformacion();
    if(datos){
      this.RefrescarDatosUsuarioSesion(datos);
    }
  }
  //VERIFICA QUE EN EL LOCALHOST DEL NAVEGADOR HALLAN DATOS GUARDADOS
  SeHaIniciadoSesion(){
    let datosString = localStorage.getItem("datosSesion"); //en datosString guardame lo que hay en localStorage atraves de getitem que hay en datos sesion
    return datosString;//retorna la variable datosString en formato cadena
  }
  //GUARDA LOS DATOS DEL INICIO DE SESION EN EL LOCALHOST DEL NAVEGADOR FORMATO JSON
  AlmacenarSesion(datos: ModeloIdentificar){//este metodo almacena en el navegador la informacion de iniciar sesion
    datos.estaIdentificado=true;
    if(datos.datos?.rol=="Admin"){
      datos.inicioAdmin=true;
    }else if (datos.datos?.rol=="asesor"){
      datos.inicioAsesor=true;
      datos.tk="";
    }else{
      datos.inicioCliente=true;
      datos.tk="";
    }
    let datosString = JSON.stringify(datos);
    localStorage.setItem("datosSesion",datosString);
    this.RefrescarDatosUsuarioSesion(datos);
  }
  //GUARDA LOS DATOS DEL INICIO DE SESION EN EL LOCALHOST DEL NAVEGADOR FORMATO JSON
  ActualizarSesion(datos: ModeloDatos){//este metodo almacena en el navegador la informacion de iniciar sesion
    
    let datos2:ModeloIdentificar={
      datos,
      estaIdentificado:true,
    }
    if(datos.rol=="Admin"){
      datos2.inicioAdmin=true;
      datos2.tk=this.ObtenerToken();
      let validarRol=this.ObtenerRol();
      if (datos.rol == validarRol.datos.rol){
        //alert("no cambio de rol")
      }else{
        alert("cierra sesion y vuelve a iniciar para tener todos los permisos de administrador")
      }
      
    }else if (datos.rol=="asesor"){
      datos2.inicioAsesor=true;
    }else{
      datos2.inicioCliente=true;
    }
    let datosString = JSON.stringify(datos2);
    localStorage.setItem("datosSesion",datosString);
    this.RefrescarDatosUsuarioSesion(datos2);
  }
  //RECIBE LOS DATOS DEL INICIO DE SESION  GUARDADOS EN EL LOCALHOST DEL NAVEGADOR EN FORMATO STRING
  ObtenerInformacion(){//este metodo obtiene la informacion alojada en la memoria interna de el navegador
    let datosString = localStorage.getItem("datosSesion");// a datosString entregale lo q hay en Localstorage con el atributo getItem lo que esta en la variable datosSesion
    if(datosString){//si es verdadero si tiene el archivo 
      let datos = JSON.parse(datosString);//a datos conviertelo en formato json atravez del parse lo que hay en datosString
      return datos;//retorna la variable datos en formato json
    }
    else{
      return null;
    }
  }
  //ELIMINA LOS DATOS DEL INICIO DE SESION  GUARDADOS EN EL LOCALHOST DEL NAVEGADOR EN FORMATO STRING
  EliminarInformacionSesion(){//este metodo elimina los datos de la sesion en el navegador
    localStorage.removeItem("datosSesion");
    this.RefrescarDatosUsuarioSesion(new ModeloIdentificar());
  }
  //OBTENER EL TOKEN PARA LA AUTENTICACION
  ObtenerToken(){
    let datosString = localStorage.getItem("datosSesion");
    if(datosString){
      let datos = JSON.parse(datosString);
      return datos.tk;
    }
    else{
      return "";
    }
  }
  //OBTENER EL ROL PARA EL INICIO DE SESION
  ObtenerRol(){
    //let datos=ModeloDatos
    let datosString = localStorage.getItem("datosSesion");
    if (datosString){
      let datos = JSON.parse(datosString);
      return datos;
    }
    else{
      return "";
    }
  }



}

