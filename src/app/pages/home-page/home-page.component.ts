import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, MatIcon, MatCardModule, MatButton, MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  palavras: string[] = [".NET", "PHP", "JAVA", "C#", "PYTHON", "RUBY", "JAVASCRIPT", "TYPESCRIPT"];
  palavraAtual: string = this.palavras[0];
  indice: number = 0;

  ngOnInit(): void {
    // Inicia o intervalo assim que o componente for carregado
    setInterval(() => this.trocarPalavra(), 3000);
  }

  trocarPalavra(): void {
    // Atualiza o texto da palavra
    this.palavraAtual = this.palavras[this.indice];

    // Atualiza o índice para a próxima palavra
    this.indice = (this.indice + 1) % this.palavras.length; // Isso garante que o índice volte ao 0 quando atingir o final do array
  }
}
