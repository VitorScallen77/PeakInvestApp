import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  resultado: string | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.cadastroForm = this.fb.group({
      parcelas: [null, [Validators.required, Validators.min(1)]],
      valor: [null, [Validators.required, Validators.min(0.01)]],
      resultado: [{ value: '', disabled: true }]
    });
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      const { parcelas, valor } = this.cadastroForm.value;
      this.apiService.calcularResultado(parcelas, valor).subscribe(response => {
        if (response && response.resultado !== undefined) {
          this.resultado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(response.resultado);
          this.cadastroForm.patchValue({ resultado: this.resultado });
        }
      }, error => {
        console.error('Erro ao calcular resultado:', error);
      });
    }
  }
}
