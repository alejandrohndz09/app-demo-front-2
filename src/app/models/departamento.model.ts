import {Municipio} from './municipio.model';

export class Departamento {
  id?: number;
  codigo?:string;
  nombre?:string;
  municipios?:Municipio[];

  constructor(id?:number, codigo?:string, nombre?:string, municipios?:Municipio[]) {
    this.id = id;
    this.codigo = codigo;
    this.nombre = nombre;
    this.municipios = municipios;
  }
}
