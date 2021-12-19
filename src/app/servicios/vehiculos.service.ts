import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloVehiculo } from '../modelos/vehiculo.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  token:string="";

  constructor(private http: HttpClient, private servicioSeguridad:SeguridadService) { 
    this.token=this.servicioSeguridad.ObtenerToken();
  }
  /*lista de los vehiculos */
  ObtenerTodosVehiculos():Observable <ModeloVehiculo[]>{
    return this.http.get<ModeloVehiculo[]>("https://autoluxuryb.herokuapp.com/vehiculos");
  }
  /*buscar vehiculos por id*/
  BuscarVehiculoPorId(id:string):Observable <ModeloVehiculo>{
    return this.http.get<ModeloVehiculo>(`https://autoluxuryb.herokuapp.com/vehiculos/${id}`);
  }
  /*crear un vehiculo nuevo */
  CrearVehiculo(vehiculo: ModeloVehiculo):Observable<ModeloVehiculo>{
   return this.http.post("https://autoluxuryb.herokuapp.com/vehiculos",vehiculo,{
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
      })
    })
  }
  /*actualizar un vehiculo  */
  ActualizarVehiculo(vehiculo: ModeloVehiculo):Observable<ModeloVehiculo>{
    return this.http.put<ModeloVehiculo>(`https://autoluxuryb.herokuapp.com/vehiculos/${vehiculo.id}`,vehiculo,{
     headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
       })
     })
   }
   /*eliminar un vehiculo  */
  EliminacionVehiculo(id:string):Observable<any>{
    return this.http.delete(`https://autoluxuryb.herokuapp.com/vehiculos/${id}`,{
     headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
       })
     })
   }
}
