import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IUser } from '../../interfaces/IUser';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loginEmpresa',
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
  templateUrl: './login-empresa.component.html',
  styleUrls: ['./login-empresa.component.css']
})
export class LoginEmpresaComponent {
  loginempresa: string = "Login como empresa";
  isCadastro: boolean = false;

  // Campos de Login
  loginEmail: string = '';
  loginPassword: string = '';

  // Campos de Cadastro
  name: string = '';
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';
  typeuser: string = 'enterprise';
  CreatedAt?: Date = new Date();
  cpnj?: string = '';
  phone?: string = '';
  address?: string = '';
  cep?: string = '';
  imageprofile?: string = '';

  constructor(private userService: UserService, private router: Router) { }


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

  onLogin(): void {
    if (!this.loginEmail || !this.loginPassword) {
      console.error('Preencha todos os campos de login.');
      return;
    }
    console.log('Logando com:', { email: this.loginEmail, password: this.loginPassword });

    const user: IUser = {
      email: this.loginEmail,
      password: this.loginPassword,
      typeuser: 'enterprise',
    };

    this.userService.loginUser(user).subscribe(
      (response) => {
        if (response.length > 0) {
          const loggedUser = response[0];
          console.log('Usuário logado com sucesso:', loggedUser);

          if (loggedUser.id) {
            localStorage.setItem('userId', loggedUser.id);
            this.router.navigate(['/dashboard-empresa'])
          } else {
            console.log('ID do usuário não está definido.');
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
    if (!this.email || !this.password || !this.passwordConfirm) {
      console.error('Preencha todos os campos de cadastro.');
      return;
    }

    if (this.password !== this.passwordConfirm) {
      console.error('As senhas não coincidem.');
      return;
    }

    this.userService.getUserByEmail(this.email).subscribe(
      (response) => {
        if (response.length > 0) {
          console.error('Email já está cadastrado.');
          return //Impede a criação do usuário
        }
        // Criar o novo usuário se o email não estiver cadastrado
        const newUser: IUser = {
          name: this.name,
          email: this.email,
          password: this.password,
          typeuser: 'enterprise',
          createdAt: this.CreatedAt,
          cnpj: this.cpnj,
          phone: this.phone,
          address: this.address,
          cep: this.cep,
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
        )
      },
      (error) => {
        console.error('Erro ao verificar email:', error);
      }
    );
  }
}

