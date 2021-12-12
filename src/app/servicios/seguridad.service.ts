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

  constructor(private http: HttpClient) { 
    this.verificarSesionActual();
  }
  /* metodos para validar el inicio y eliminacion de la informacion */
  //IDENTIFICA EL USUARIO EN LA BASE DE DATOS
  Identificar(usuario: string, clave: string):Observable<ModeloIdentificar>{
    return this.http.post("http://localhost:3000/identificarPersona",{
      usuario:usuario,
      clave:clave
    },
    {
      headers: new HttpHeaders()
    })
  }
  //RESETEA DESPUES DE HABER ELIMINADO LOS DATOS DE LA SESION
  RefrescarDatosUsuarioSesion(datos: ModeloIdentificar){
    this.DatosUsuarioSesion.next(datos);
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
    }else{
      datos.inicioCliente=true;
    }
    let datosString = JSON.stringify(datos);
    localStorage.setItem("datosSesion",datosString);
    this.RefrescarDatosUsuarioSesion(datos);
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

