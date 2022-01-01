
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloCambiarClave } from '../modelos/cambiarClave.modelo';
import { ModeloPersonas } from '../modelos/personas.modelo';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http:HttpClient) { }

/*lista de personas */
ObtenerTodasPersonas():Observable <ModeloPersonas[]>{
  //return this.http.get<ModeloPersonas[]>("http://localhost:3000/personas");
  return this.http.get<ModeloPersonas[]>("https://autoluxuryb.herokuapp.com/personas");
}
/*buscar personas por id*/
BuscarPersonaPorId(id:string):Observable <ModeloPersonas>{
  //return this.http.get<ModeloPersonas>(`http://localhost:3000/personas/${id}`);
  return this.http.get<ModeloPersonas>(`https://autoluxuryb.herokuapp.com/personas/${id}`);
}
/*crear un persona nuevo */
CrearPersona(persona: ModeloPersonas):Observable<ModeloPersonas>{
  //return this.http.post("http://localhost:3000/personas",persona)
  return this.http.post("https://autoluxuryb.herokuapp.com/personas",persona)
}
/*actualizar un persona  */
ActualizarPersona(persona: ModeloPersonas):Observable<ModeloPersonas>{
  //return this.http.patch<ModeloPersonas>(`http://localhost:3000/personas/${persona.id}`,persona
  return this.http.patch<ModeloPersonas>(`https://autoluxuryb.herokuapp.com/personas/${persona.id}`,persona)   
}
/*eliminar un persona  */
EliminacionPersona(id:string):Observable<any>{
  //return this.http.delete(`http://localhost:3000/personas/${id}`)
  return this.http.delete(`https://autoluxuryb.herokuapp.com/personas/${id}`)
 }
RecuperarClave(persona:ModeloPersonas):Observable<ModeloPersonas>{
  //return this.http.post("http://localhost:3000/recuperarClave",persona);
  return this.http.post("`https://autoluxuryb.herokuapp.com/recuperarClave",persona);
 }
 /*contactar un persona  */
ContactarPersona(nombre:string,email:string,emailPrueba:string,telefono:string,mensaje:string):Observable<any>{
  //return this.http.post(`http://localhost:3000/contactoPersona`,
  return this.http.post(`https://autoluxuryb.herokuapp.com/contactoPersona`,{
    nombre:nombre,
    email:email,
    emailPrueba:emailPrueba,
    telefono:telefono,
    mensaje:mensaje
  })
 }
 /*buscar personas por id*/
 BuscarPersonaParaCambioDeClave(id:string):Observable <ModeloCambiarClave>{
  //return this.http.get<ModeloCambiarClave>(`http://localhost:3000/personas/${id}`
  return this.http.get<ModeloCambiarClave>(`https://autoluxuryb.herokuapp.com/personas/${id}`);
}
}
