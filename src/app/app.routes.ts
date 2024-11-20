import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastrarSeComponent } from './pages/cadastrar-se/cadastrar-se.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { LoginComponent } from './pages/login/login.component';
import { VerVagasComponent } from './pages/ver-vagas/ver-vagas.component';

export const routes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cadastrar-se', component: CadastrarSeComponent },
  { path: 'empresa', component: EmpresaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ver-vagas', component: VerVagasComponent },
  { path: '**', redirectTo: '/home' },
];
