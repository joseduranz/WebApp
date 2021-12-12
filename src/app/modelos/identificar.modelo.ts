import { ModeloDatos } from "./datos.modelo";

export class ModeloIdentificar{
    datos?: ModeloDatos;
    tk?: string;
    estaIdentificado?:boolean=false;
    inicioAdmin?:boolean=false;
    inicioAsesor?:boolean=false;
    inicioCliente?:boolean=false;
}