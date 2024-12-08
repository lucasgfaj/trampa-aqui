import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import necessário para *ngIf

@Component({
  selector: 'app-form-validator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Adicione CommonModule aqui
  templateUrl: './form-validator.component.html',
  styleUrls: ['./form-validator.component.css'],
})
export class FormValidatorComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  validateForm(): void {
    // Método chamado em cada input para validar o formulário dinamicamente
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      // Armazena os dados no Web Storage
      localStorage.setItem('formData', JSON.stringify(formData));
      alert('Formulário enviado com sucesso!');
    }
  }
}
