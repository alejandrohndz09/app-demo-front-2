import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";
import {Distrito} from '../models/distrito.model';


@Injectable({
  providedIn: 'root'
})
export class DistritoDataService extends DataService<Distrito> {


  constructor(http: HttpClient) {
    let baseUrl: string = "http://localhost:8080/distritos";
    super(http, baseUrl);
  }

}
