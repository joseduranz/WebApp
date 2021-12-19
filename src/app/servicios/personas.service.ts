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
  return this.http.get<ModeloPersonas[]>("https://autoluxuryb.herokuapp.com/personas");
}
/*buscar personas por id*/
BuscarPersonaPorId(id:string):Observable <ModeloPersonas>{
  return this.http.get<ModeloPersonas>(`https://autoluxuryb.herokuapp.com/personas/${id}`);
}
/*crear un persona nuevo */
CrearPersona(persona: ModeloPersonas):Observable<ModeloPersonas>{
  return this.http.post("https://autoluxuryb.herokuapp.com/personas",persona)
}
/*actualizar un persona  */
ActualizarPersona(persona: ModeloPersonas):Observable<ModeloPersonas>{
  return this.http.put<ModeloPersonas>(`https://autoluxuryb.herokuapp.com/personas/${persona.id}`,persona)   
}
/*eliminar un persona  */
EliminacionPersona(id:string):Observable<any>{
  return this.http.delete(`https://autoluxuryb.herokuapp.com/personas/${id}`)
 }
}
