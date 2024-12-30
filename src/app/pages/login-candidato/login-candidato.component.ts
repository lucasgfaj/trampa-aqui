import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-candidato',
  standalone: true,
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login-candidato.component.html',
  styleUrls: ['./login-candidato.component.css']
})
export class LoginCandidatoComponent {
  cadastroForm: FormGroup;
  logincandidato: string = "Login como candidato";
  isCadastro: boolean = false;

  onTabChange(event: any): void {
    const selectedTabIndex = event.index;

    if (selectedTabIndex === 0) {
      this.logincandidato = "Login como candidato";
      this.isCadastro = false;
    } else if (selectedTabIndex === 1) {
      this.logincandidato = "Cadastre-se como Candidato";
      this.isCadastro = true;
    }
  }

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
        ],
      ],
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/), // Pelo menos uma letra maiúscula e um número
        ],
      ],
      senhaConfirmacao: ['', [Validators.required]],
    })
  }

  validarSenhas(): boolean {
    const senha = this.cadastroForm.get('senha')?.value;
    const senhaConfirmacao = this.cadastroForm.get('senhaConfirmacao')?.value;
    return senha === senhaConfirmacao;
  }

  onSubmit(): void {
    if (this.cadastroForm.valid && this.validarSenhas()) {
      alert('Cadastro realizado com sucesso!');
    } else {
      alert('Erro no formulário. Verifique os campos!');
    }
  }

}