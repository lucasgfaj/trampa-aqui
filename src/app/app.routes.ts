import { AuthGuard } from '../guards/auth.guard';
import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { VerVagasComponent } from './pages/ver-vagas/ver-vagas.component';
import { SouEmpresaComponent } from './pages/sou-empresa/sou-empresa.component';
import { LoginCandidatoComponent } from './pages/login-candidato/login-candidato.component';
import { LoginEmpresaComponent } from './pages/login-empresa/login-empresa.component';
import { DashboardEmpresaComponent } from './pages/dashboard-empresa/dashboard-empresa.component';
import { DashboardCandidatoComponent } from './pages/dashboard-candidato/dashboard-candidato.component';
import { MinhasVagasComponent } from './pages/minhas-vagas/minhas-vagas.component';

export const routes: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redireciona para login-candidato por padrão
  { path: 'home', component: HomePageComponent },
  { path: 'ver-vagas', component: VerVagasComponent },
  { path: 'sou-empresa', component: SouEmpresaComponent },
  { path: 'login-candidato', component: LoginCandidatoComponent },
  { path: 'login-empresa', component: LoginEmpresaComponent },
  { path: 'dashboard-empresa', component: DashboardEmpresaComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-candidato', component: DashboardCandidatoComponent, canActivate: [AuthGuard] },
  { path: 'minhas-vagas', component: MinhasVagasComponent },
  { path: '**', redirectTo: '/home' }, // Página padrão de redirecionamento para "home-page"
];
