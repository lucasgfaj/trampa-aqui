import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardCandidatoComponent } from "./pages/dashboard-candidato/dashboard-candidato.component";
import { DashboardEmpresaComponent } from './pages/dashboard-empresa/dashboard-empresa.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, DashboardCandidatoComponent, DashboardCandidatoComponent, DashboardEmpresaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trampa-aqui';
  
}
