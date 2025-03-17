import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";
import {Municipio} from '../models/municipio.model';


@Injectable({
  providedIn: 'root'
})
export class MunicipioDataService extends DataService<Municipio> {


  constructor(http: HttpClient) {
    let baseUrl: string = "http://localhost:8080/municipios";
    super(http, baseUrl);
  }

}
