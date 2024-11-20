import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeComponent } from './pages/home/home.component';
import { CadastrarSeComponent } from './pages/cadastrar-se/cadastrar-se.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { LoginComponent } from './pages/login/login.component';
import { VerVagasComponent } from './pages/ver-vagas/ver-vagas.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,RouterOutlet, HeaderComponent, FooterComponent, HomeComponent, CadastrarSeComponent, LoginComponent, EmpresaComponent, VerVagasComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trampa-aqui';
}
