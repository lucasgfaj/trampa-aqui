import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  titulo: string = 'Bem-vindo Senhor(a)!';
  contador: number = 0;

  incrementar(): void {
    this.contador++;
  }
}
