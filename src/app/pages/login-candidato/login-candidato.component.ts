import { UserService } from './../../services/user.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExperienceLevel, IUser, ProgrammingLanguages } from '../../interfaces/IUser';
import { RedirectCommand, Router } from '@angular/router';

@Component({
  selector: 'app-login-candidato',
  standalone: true,
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './login-candidato.component.html',
  styleUrls: ['./login-candidato.component.css']
})
export class LoginCandidatoComponent {
  logincandidato: string = 'Login como candidato';
  isCadastro: boolean = false;

  // Campos de Login
  loginEmail: string = '';
  loginPassword: string = '';

  // Campos de Cadastro
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';
  typeuser: string = 'candidato';
  CreatedAt?: Date = new Date();
  cpf?: string = '';
  phone?: string = '';
  address?: string = '';
  cep?: string = '';
  linguages?: ProgrammingLanguages[] = [];
  experiencies?: ExperienceLevel = ExperienceLevel.Null;
  imageprofile?: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onTabChange(event: any): void {
    const selectedTabIndex = event.index;

    if (selectedTabIndex === 0) {
      this.logincandidato = 'Login como candidato';
      this.isCadastro = false;
    } else if (selectedTabIndex === 1) {
      this.logincandidato = 'Cadastre-se como Candidato';
      this.isCadastro = true;
    }
  }

  onLogin(): void {
    if (!this.loginEmail || !this.loginPassword) {
      console.error('Preencha todos os campos de login.');
      return;
    }
    console.log('Logando com:', { email: this.loginEmail, password: this.loginPassword });
    // Adicione lógica de autenticação aqui
  }

  onSubmit(): void {
    if (!this.email || !this.password || !this.passwordConfirm) {
      console.error('Preencha todos os campos de cadastro.');
      return;
    }

    if (this.password !== this.passwordConfirm) {
      console.error('As senhas não coincidem.');
      return;
    }

    const newUser: IUser = {
      email: this.email,
      password: this.password,
      typeuser: 'candidato',
      createdAt: this.CreatedAt,
      cpf: this.cpf,
      phone: this.phone,
      address: this.address,
      cep: this.cep,
      linguages: this.linguages,
      experiencies: this.experiencies,
      imageprofile: this.imageprofile
    };

    this.userService.createUser(newUser).subscribe(
      (response) => {
        console.log('Usuário cadastrado com sucesso:', response);
        this.email = '';
        this.password = '';
        this.passwordConfirm = '';
        //Recarrega a página
        window.location.reload();
      },
      (error) => {
        console.error('Erro ao cadastrar usuário:', error);
      }
    );
  }
}
