import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModeloSolicitud } from '../modelos/solicitud.modelo';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private http:HttpClient) { }

/*lista de solicitudes */
ObtenerTodasSolicitudes():Observable <ModeloSolicitud[]>{
  return this.http.get<ModeloSolicitud[]>("http://localhost:3000/solicituds");
}

/*buscar solicitud por id*/
BuscarSolicitudPorId(id:string):Observable <ModeloSolicitud>{
  return this.http.get<ModeloSolicitud>(`http://localhost:3000/solicituds/${id}`);
}

/*crear un solicitud nuevo */
CrearSolicitud(solicitud: ModeloSolicitud):Observable<ModeloSolicitud>{
  return this.http.post("http://localhost:3000/solicituds",solicitud)
}
/*actualizar un solicitud  */
ActualizarSolicitud(solicitud: ModeloSolicitud):Observable<ModeloSolicitud>{
  return this.http.put<ModeloSolicitud>(`http://localhost:3000/solicituds/${solicitud.id}`,solicitud,{})   
}
/*eliminar un solicitud  */
EliminacionSolicitud(id:string):Observable<any>{
  return this.http.delete(`http://localhost:3000/solicituds/${id}`)
 }


}
