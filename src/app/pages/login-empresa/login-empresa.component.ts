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
  contact?: string = '';
  street?: string = '';
  cep?: string = '';
  imageprofile?: string = '';

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) { 
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

  cadastroForm: FormGroup;
  passwordHidden: boolean = true;

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

  togglePasswordVisibility(inputElement: HTMLInputElement): void {
    inputElement.type = inputElement.type === 'password' ? 'text' : 'password';
  }

    this.userService.loginUser(user).subscribe(
      (response) => {
        if (response.length > 0) {
          const loggedUser = response[0]; // Primeiro usuário encontrado
          console.log('Usuário logado com sucesso:', loggedUser);
  
          if (loggedUser.id && loggedUser.typeuser) {
            // Salvar o ID do usuário no localStorage
            localStorage.setItem('userId', loggedUser.id);
  
            // Verificar o tipo de usuário
            if (loggedUser.typeuser === 'enterprise') {
              console.log('Usuário é um empresa.');
              this.router.navigate(['/dashboard-empresa']);
            } else if (loggedUser.typeuser === 'developer') {
              console.log('Usuário é um desenvolvedor.');
              this.router.navigate(['/dashboard-candidato']);
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
          contact: this.contact,
          street: this.street,
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

  }
}
