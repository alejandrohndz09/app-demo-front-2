import {Departamento} from './departamento.model';

export class Municipio {
  id?: number;
  codigo?:string;
  nombre?:string;
  idDepartamento?: number;
  departamento?:Departamento;
  municipios?: Municipio[];

  constructor(id?:number, codigo?:string, nombre?:string,idDepartamento?:number, departamento?:Departamento, municipios?: Municipio[]) {
    this.id = id;
    this.codigo = codigo;
    this.nombre = nombre;
    this.idDepartamento = idDepartamento;
    this.departamento = departamento;
    this.municipios=municipios;
  }
}
