import { Injectable } from '@angular/core';
import {Departamento} from "../models/departamento.model";
import {DepartamentoDataService} from "./departamento-data.service";

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  departamentos!: Departamento[];

  constructor(private dataServices:DepartamentoDataService) { }

  setDepartamentos(departamentos:Departamento[]){
    this.departamentos=departamentos;
  }

  getDepartamentos()  {
    return this.dataServices.getAll("");
  }

  getDepartamento(id: number){
    return this.dataServices.getById("",id)
  }

  agregarDepartamento(departamento: Departamento) {
    return this.dataServices.create("", departamento);
  }

  actualizarDepartamento(departamentoActualizado: Departamento, id: number) {
    return this.dataServices.update("", id, departamentoActualizado);
  }

  eliminarDepartamento(id: number) {
    return this.dataServices.delete("",id);
  }
}
