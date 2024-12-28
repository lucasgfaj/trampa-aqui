import { Component } from '@angular/core';
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
export class DashboardEmpresaComponent {
  accountForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      name: [''],
      cpf: [''],
      email: [''],
      contact: [''],
      cep: [''],
      street: [''],
      experience: [''],
      language: [''],
    });
  }

  onFileUpload(): void {
    alert('Função de upload de arquivos');
  }
}
