import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {
  consultaForm: FormGroup;
  nome: string | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.consultaForm = this.fb.group({
      id: [null, [Validators.required, Validators.min(1)]]
    });
  }

  onBuscar(): void {
    if (this.consultaForm.valid) {
      const id = this.consultaForm.value.id;
      this.apiService.buscarNomePorId(id).subscribe(response => {
        this.nome = response.nome;
        this.consultaForm.patchValue({ nome: this.nome });
      });
    }
  }
}
