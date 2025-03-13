import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Departamento} from "../models/departamento.model";
import {DataService} from "./data.service";


@Injectable({
  providedIn: 'root'
})
export class DepartamentoDataService extends DataService<Departamento> {


  constructor(http: HttpClient) {
    let baseUrl: string = "http://localhost:8080/departamentos";
    super(http, baseUrl);
  }

  /*
    leerDepartamentos(){
      return  this.httpClient.get(this.url);
    }

    leerDepartamento(id:number){
      return  this.httpClient.get(this.url+id);
    }

    guardarDepartamentos(departamento: Departamento, lista:Departamento[]){
      return this.httpClient.post(this.url,departamento).subscribe(
        response=>{
          this.alertaService.mostrarMensaje('Operación exitosa: '+ response);
          lista.push(departamento);
        },
        error=>  this.alertaService.mostrarMensaje('Error: '+error)
      );
    }

    actualizarDepartamento(id:number,departamento:Departamento, lista:Departamento[]){
      this.httpClient.put(this.url+id,departamento).subscribe(
        response=>{
          // Encuentra el índice del departamento en el arreglo local
          const indice = lista.findIndex(departamento => departamento.id === id);
          // Si se encuentra el departamento, actualiza la información localmente
          if (indice !== -1) {
            lista[indice] = departamento;
          }
          this.alertaService.mostrarMensaje('Operación exitosa: '+ response)
        },
        error=>  this.alertaService.mostrarMensaje('Error: '+error)
      );
    }

    eliminarDepartamento(id:number, lista:Departamento[]){
      this.httpClient.delete(this.url+id).subscribe(
        response=>{
          this.alertaService.mostrarMensaje('Operación exitosa: '+ response)
          //eliminamos localmente
          lista = lista.filter(departamento => departamento.id !== id);
        },
        error=>  this.alertaService.mostrarMensaje('Error: '+error)
      );
    }*/

}
