import {Departamento} from './departamento.model';
import {Municipio} from './municipio.model';

export class Distrito {
  id?: number;
  codigo?: string;
  nombre?: string;
  idMunicipio?: number;
  municipio?: Municipio;

  constructor(id?: number, codigo?: string, nombre?: string, idMunicipio?: number, municipio?: Municipio) {
    this.id = id;
    this.codigo = codigo;
    this.nombre = nombre;
    this.idMunicipio = idMunicipio;
    this.municipio = municipio;
  }
}
