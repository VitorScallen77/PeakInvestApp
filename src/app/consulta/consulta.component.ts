import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  consultaForm!: FormGroup;
  constructor(private fb: FormBuilder, private apiService: ApiService) {
    
  }
  ngOnInit(): void {
    this.consultaForm = this.fb.group({
      id: [''],
      nome: ['']
    });
    console.log(this.consultaForm);
  }

  onBuscar(): void {
    if (this.consultaForm.valid) {
      const id = this.consultaForm.value.id;
      this.apiService.buscarNomePorId(id).subscribe(response => {
        //this.consultaForm.value.nome = response.nome;
        this.consultaForm.patchValue(response);
      });
    }
  }
}
