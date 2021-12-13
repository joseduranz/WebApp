import { Component, OnInit } from '@angular/core';
import { ModeloPersonas } from 'src/app/modelos/personas.modelo';
import { ModeloSolicitud } from 'src/app/modelos/solicitud.modelo';
import { ModeloVehiculo } from 'src/app/modelos/vehiculo.modelo';
import { PersonasService } from 'src/app/servicios/personas.service';
import { SolicitudesService } from 'src/app/servicios/solicitudes.service';
import { VehiculosService } from 'src/app/servicios/vehiculos.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  listadosolicitudes: ModeloSolicitud[] = [];
  idCliente?: string = "";
  persona: ModeloPersonas = new ModeloPersonas;
  vehiculo: ModeloVehiculo = new ModeloVehiculo;

  constructor(
    private servicioSolicitud: SolicitudesService,
    private servicioPersona: PersonasService,
    private servicioVehiculo: VehiculosService
  ) { }

  ngOnInit(): void {
    this.ObtenerListadoSolicitudes();

  }

  ObtenerListadoSolicitudes() {
    this.servicioSolicitud.ObtenerTodasSolicitudes().subscribe((datos: ModeloSolicitud[]) => {
      this.listadosolicitudes = datos;
      for (let p of datos) {
        let idCliente: any = p.personaId;
        let idVehiculo: any = p.vehiculoId;

        this.servicioPersona.BuscarPersonaPorId(idCliente).subscribe((persona: ModeloPersonas) => {
          this.persona.id = persona.id;
          this.persona.nombres = persona.nombres;
          this.persona.apellidos = persona.apellidos;
          this.persona.rol = persona.rol;
          this.persona.correoElectronico = persona.correoElectronico;
          this.persona.celular = persona.celular;
        });

        this.servicioVehiculo.BuscarVehiculoPorId(idVehiculo).subscribe((vehiculo: ModeloVehiculo) => {
          this.vehiculo.id = vehiculo.id;
          this.vehiculo.precio = vehiculo.precio;
          this.vehiculo.foto = vehiculo.foto;
        });
      }
    })
  }


}
