import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, MatMenuModule, MatToolbarModule, MatButtonModule, RouterLink, MatListModule, MatSidenavModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'trampa-aqui';

  userType: string | null = null; // Tipo de usuário: 'candidato' ou 'empresa'
  isLoggedIn: boolean = false; // Estado de login

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Verificar se o usuário está logado e qual o tipo de usuário
    this.updateLoginState();
  }

  updateLoginState(): void {
    // Verifica se o 'userId' está presente no localStorage
    this.isLoggedIn = !!localStorage.getItem('userId');
    // Obtém o tipo de usuário (empresa ou candidato) se estiver logado
    this.userType = localStorage.getItem('userType');
    // Forçar a detecção de mudanças para atualizar a interface
    this.cdr.detectChanges();
  }

  logout(): void {
    // Limpar as informações de login do localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    // Atualizar o estado de login
    this.updateLoginState();
    // Redirecionar para a página inicial
    this.router.navigate(['/home']);
  }
}