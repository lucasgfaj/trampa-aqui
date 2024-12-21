import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login-candidato',
  standalone: true,
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login-candidato.component.html',
  styleUrls: ['./login-candidato.component.css']
})
export class LoginCandidatoComponent {
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
}