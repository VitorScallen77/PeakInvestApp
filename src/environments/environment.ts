import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:44352/api/'; // URL base da sua API

  constructor(private http: HttpClient) { }

  getDados(): Observable<any> {
    return this.http.get(this.baseUrl + 'dados');
  }
}

export const environment = {
    production: false
  };
  