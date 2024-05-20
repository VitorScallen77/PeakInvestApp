import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cadastroForm!: FormGroup;
  consultaForm!: FormGroup;
  resultado!: number;
  nome!: string;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      parcelas: [null, Validators.required],
      valor: [null, Validators.required],
      resultado: [{ value: '', disabled: true }]
    });

    this.consultaForm = this.fb.group({
      id: [null, Validators.required],
      nome: [{ value: '', disabled: true }]
    });

    this.cadastroForm.valueChanges.subscribe(values => {
      const { parcelas, valor } = values;
      if (parcelas != null && valor != null) {
        this.apiService.calcularResultado(parcelas, valor).subscribe(response => {
          this.resultado = response.resultado;
          this.cadastroForm.patchValue({ resultado: this.resultado }, { emitEvent: false });
        });
      }
    });
  }

  onSubmit(): void {
    // lógica para submissão do cadastroForm
  }

  onBuscar(): void {
    const id = this.consultaForm.get('id')?.value;
    if (id != null) {
      this.apiService.buscarNomePorId(id).subscribe(response => {
        this.nome = response.nome;
        this.consultaForm.patchValue({ nome: this.nome });
      });
    }
  }
}
