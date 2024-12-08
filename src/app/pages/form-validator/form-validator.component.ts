import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import necessário para *ngIf

@Component({
  selector: 'app-form-validator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './form-validator.component.html',
  styleUrls: ['./form-validator.component.css'],
})
export class FormValidatorComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Criando o formulário com FormBuilder
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]], // Ajuste para aceitar espaços
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * Função assíncrona para enviar dados ao JSON Server.
   * Usando Fetch API com `async/await`.
   */
  async handleSubmit() {
    if (this.form.valid) {
      try {
        const response = await fetch('http://localhost:3000/entities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: this.form.get('name')?.value,
            email: this.form.get('email')?.value,
          }),
        });

        if (!response.ok) {
          throw new Error('Erro ao enviar dados');
        }

        const result = await response.json();
        console.log('Resposta do servidor:', result);

        alert('Dados salvos com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar dados:', error);
        alert('Erro ao salvar dados');
      }
    } else {
      alert('Por favor, corrija os erros do formulário.');
    }
  }
}
