import { HttpClient } from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService<T> {

  constructor(private http: HttpClient,  @Inject('baseUrl')  private baseUrl: string) {}

  getAll(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${endpoint}`);
  }

  getById(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}`);
  }

  create(endpoint: string, item: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, item);
  }

  update(endpoint: string, id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}/${id}`, item);
  }

  delete(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
