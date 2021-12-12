import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloPersonas } from '../modelos/personas.modelo';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http:HttpClient) { }

/*lista de personas */
ObtenerTodasPersonas():Observable <ModeloPersonas[]>{
  return this.http.get<ModeloPersonas[]>("http://localhost:3000/personas");
}
/*buscar personas por id*/
BuscarPersonaPorId(id:string):Observable <ModeloPersonas>{
  return this.http.get<ModeloPersonas>(`http://localhost:3000/personas/${id}`);
}
/*crear un persona nuevo */
CrearPersona(persona: ModeloPersonas):Observable<ModeloPersonas>{
  return this.http.post("http://localhost:3000/personas",persona)
}
/*actualizar un persona  */
 ActualizarPersona(persona: ModeloPersonas):Observable<ModeloPersonas>{
  return this.http.put<ModeloPersonas>(`http://localhost:3000/personas/${persona.id}`,persona)   
}
/*eliminar un persona  */
EliminacionPersona(id:string):Observable<any>{
  return this.http.delete(`http://localhost:3000/personas/${id}`)
 }
}
