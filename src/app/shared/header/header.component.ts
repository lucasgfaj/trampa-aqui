import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule, MatToolbarModule, MatButtonModule, RouterLink, MatListModule, MatSidenavModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {
  userType: string | null = null; // Tipo de usuário: 'candidato' ou 'empresa'
  isLoggedIn: boolean = false; // Estado de login

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Verificar se o usuário está logado e qual o tipo de usuário
    this.userType = localStorage.getItem('userType'); // 'candidato' ou 'empresa'
    this.isLoggedIn = !!localStorage.getItem('userId') !== null; // Verificar se existe um 'userId' no localStorage
  }

  updateLoginState() {
    this.isLoggedIn = !!localStorage.getItem('userId');
    this.cdr.detectChanges();  // Força a detecção de mudanças
  }

  logout(): void {
    // Limpar as informações de login do localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    this.isLoggedIn = false;

    // Forçar a detecção de mudanças
    this.cdr.detectChanges();

    this.router.navigate(['/home']); // Redirecionar para a página inicial
  }
}