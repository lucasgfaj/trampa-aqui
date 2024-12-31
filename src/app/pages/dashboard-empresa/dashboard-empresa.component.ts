import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { JobApiComponent } from '../job-api/job-api.component';
import { CommonModule } from '@angular/common';
import { IUser } from '../../interfaces/IUser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard-empresa',
  standalone: true,
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    JobApiComponent,
    CommonModule
  ],
  templateUrl: './dashboard-empresa.component.html',
  styleUrls: ['./dashboard-empresa.component.css'],
})
export class DashboardEmpresaComponent implements OnInit {
  accountForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.accountForm = this.fb.group({
      name: [''],
      cnpj: [''],
      email: [''],
      contact: [''],
      cep: [''],
      street: [''],
      password:[''],
    });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (user: IUser) => {
          this.accountForm.patchValue({
            name: user.name,
            cnpj: user.cnpj,
            email: user.email,
            contact: user.phone,
            cep: user.cep,
            street: user.address,
            password: user.password,
          });
        },
        (error) => {
          console.error('Erro ao buscar os dados do usuário:', error);
        }
      );
    } else {
      console.warn('Nenhum ID de usuário encontrado no localStorage');
    }
  }

  onSave(): void {
      if (this.accountForm.valid) {
        const updatedUser: IUser = this.accountForm.value;
        const userId = localStorage.getItem('userId');
        if (userId) {
          updatedUser.id = userId; // Definir o ID para atualização
          this.userService.updateUser(updatedUser).subscribe(
            (response) => {
              console.log('Usuário atualizado com sucesso:', response);
            },
            (error) => {
              console.error('Erro ao atualizar o usuário:', error);
            }
          );
        }
      }
    }


  onFileUpload(): void {
    alert('Função de upload de arquivos');
  }

  secFilter: boolean = false;

  toggleVisibility() {
    this.secFilter = !this.secFilter;
  }

}
