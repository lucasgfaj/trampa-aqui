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
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-candidato.component.html',
  styleUrls: ['./login-candidato.component.css']
})
export class LoginCandidatoComponent {
  logincandidato: string = 'Login como candidato';
  isCadastro: boolean = false;
  passwordHidden: boolean = true;

  // Campos de Login
  loginEmail: string = '';
  loginPassword: string = '';
  loginId: string = '';

  // Campos de Cadastro
  name: string = '';
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';
  typeuser: string = 'developer';
  CreatedAt?: Date = new Date();
  cpf?: string = '';
  contact?: string = '';
  street?: string = '';
  cep?: string = '';
  linguages?: ProgrammingLanguages[] = [];
  experiencies?: ExperienceLevel = ExperienceLevel.Null;
  imageprofile?: string = '';

  // Variável para controlar se o formulário está em processamento
  isProcessing: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  togglePasswordVisibility(inputElement: HTMLInputElement): void {
    inputElement.type = inputElement.type === 'password' ? 'text' : 'password';
  }

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

    const user: IUser = {
      email: this.loginEmail,
      password: this.loginPassword,
      typeuser: 'developer', 
    };

    this.userService.loginUser(user).subscribe(
      (response) => {
        if (response.length > 0) {
          const loggedUser = response[0]; // Primeiro usuário encontrado
          console.log('Usuário logado com sucesso:', loggedUser);

          if (loggedUser.id && loggedUser.typeuser) {
            // Salvar o ID do usuário no localStorage
            localStorage.setItem('userId', loggedUser.id);
            localStorage.setItem('userType', loggedUser.typeuser);

            // Verificar o tipo de usuário
            if (loggedUser.typeuser === 'developer') {
              this.router.navigate(['/dashboard-candidato']);
            } else if (loggedUser.typeuser === 'enterprise') {
              this.router.navigate(['/dashboard-empresa']);
            } else {
              console.error('Tipo de usuário não reconhecido:', loggedUser.typeuser);
            }
          } else {
            console.error('Dados incompletos do usuário retornados pela API.');
          }
        } else {
          console.error('Nenhum usuário encontrado com as credenciais fornecidas.');
        }
      },
      (error) => {
        console.error('Erro ao logar usuário:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.isProcessing) {
      console.log('Processamento em andamento, tente novamente mais tarde.');
      return; // Impede novas tentativas enquanto o processo de cadastro está em andamento
    }

    if (!this.email || !this.password || !this.passwordConfirm) {
      console.error('Preencha todos os campos de cadastro.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(this.email)) {
      console.error('O email informado não é válido.');
      return;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{12,}$/;
    if (!passwordPattern.test(this.password)) {
      console.error('A senha deve ter pelo menos 12 caracteres, incluindo uma letra maiúscula e um número.');
      return;
    }

    if (this.password !== this.passwordConfirm) {
      console.error('As senhas não coincidem.');
      return;
    }

    // Definir flag de processamento
    this.isProcessing = true;

    // Verificar se o email já está cadastrado
    this.userService.getUserByEmail(this.email).subscribe(
      (response) => {
        if (response.length > 0) {
          console.error('Email já está cadastrado.');
          this.isProcessing = false; // Liberar o processo
          return; // Impede a criação do usuário
        }

        // Caso o e-mail não esteja cadastrado, criar o novo usuário
        const newUser: IUser = {
          name: this.name,
          email: this.email,
          password: this.password,
          typeuser: 'developer',
          createdAt: this.CreatedAt,
          cpf: this.cpf,
          contact: this.contact,
          street: this.street,
          cep: this.cep,
          linguages: this.linguages,
          experiencies: this.experiencies,
          imageprofile: this.imageprofile
        };

        // Criar o usuário
        this.userService.createUser(newUser).subscribe(
          (createResponse) => {
            console.log('Usuário cadastrado com sucesso:', createResponse);
            // Limpar os campos após cadastro
            this.email = '';
            this.password = '';
            this.passwordConfirm = '';
            // Redirecionar ou recarregar a página
            this.isProcessing = false; // Liberar o processo
            window.location.reload();
          },
          (createError) => {
            console.error('Erro ao cadastrar usuário:', createError);
            this.isProcessing = false; // Liberar o processo em caso de erro
          }
        );
      },
      (error) => {
        console.error('Erro ao verificar email:', error);
        this.isProcessing = false; // Liberar o processo em caso de erro
      }
    );
  }
}
