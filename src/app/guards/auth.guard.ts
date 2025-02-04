import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');

    if (userId && userType) {
      return true; // Usuário autenticado
    }

    this.router.navigate(['/home']); // Redireciona para login
    return false;
  }
}
