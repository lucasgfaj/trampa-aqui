import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginEmpresa',
  standalone: true,
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule, 
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-empresa.component.html',
  styleUrls: ['./login-empresa.component.css']
})
export class LoginEmpresaComponent {
  loginempresa: string = "Login como empresa";
  isCadastro: boolean = false;
  cadastroForm: FormGroup;

  onTabChange(event: any): void {
    const selectedTabIndex = event.index;

    if (selectedTabIndex === 0) {
      this.loginempresa = "Login como empresa";
      this.isCadastro = false;
    } else if (selectedTabIndex === 1) {
      this.loginempresa = "Cadastre-se como empresa";
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