import {Departamento} from './departamento.model';
import {Distrito} from './distrito.model';

export class Municipio {
  id?: number;
  codigo?:string;
  nombre?:string;
  idDepartamento?: number;
  departamento?:Departamento;
  municipios?: Municipio[];
  distritos?: Distrito[];

  constructor(id?:number, codigo?:string, nombre?:string,idDepartamento?:number, departamento?:Departamento, municipios?: Municipio[], distritos?:Distrito[]) {
    this.id = id;
    this.codigo = codigo;
    this.nombre = nombre;
    this.idDepartamento = idDepartamento;
    this.departamento = departamento;
    this.municipios=municipios;
    this.distritos=distritos;

  }
}
