import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:44352/api'; // URL base da sua API

  constructor(private http: HttpClient) { }

  calcularResultado(parcelas: number, valor: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Cadastro/calcular`, { parcelas, valor }).pipe(
      catchError(error => {
        console.error('Erro ao calcular resultado:', error);
        throw error;
      })
    );
  }

  buscarNomePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Consulta/buscar/${id}`).pipe(
      catchError(error => {
        console.error('Erro ao buscar nome por ID:', error);
        throw error;
      })
    );
  }
}
