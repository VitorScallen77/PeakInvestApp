import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x: string]: any;

  private apiUrl = 'https://localhost:44352/api'; // URL base da sua API
  calcular: any;

  constructor(private http: HttpClient) { }

  calcularResultado(parcelas: number, valor: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/Cadastro/calcular`, { parcelas, valor });
  }

  buscarNomePorId(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/Consulta/buscar/${id}`).pipe(
    catchError(error => {
      console.error('Erro ao buscar nome por ID:', error);
      throw error;
    })
  );
}
}