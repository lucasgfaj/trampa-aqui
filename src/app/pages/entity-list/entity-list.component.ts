import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Entity {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-entity-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entity-list.component.html',
  styleUrl: './entity-list.component.css'
})
export class EntityListComponent implements OnInit {
  private http = inject(HttpClient);

  entities: Entity[] = [];
  newEntity = { name: '', email: '' };
  errorMessage = '';

  ngOnInit() {
    // Optional: you can load entities on init if desired
  }

  loadEntities() {
    this.http.get<Entity[]>('http://localhost:3000/entities')
      .subscribe({
        next: (data) => {
          this.entities = data;
          this.errorMessage = data.length === 0 
            ? 'Nenhuma entidade encontrada' 
            : '';
        },
        error: (err) => {
          console.error('Erro ao carregar entidades', err);
          this.errorMessage = 'Não foi possível carregar as entidades';
          this.entities = [];
        }
      });
  }

  addEntity() {
    if (!this.newEntity.name || !this.newEntity.email) {
      this.errorMessage = 'Preencha todos os campos';
      return;
    }

    const entityToAdd = {
      id: this.generateId(),
      name: this.newEntity.name,
      email: this.newEntity.email
    };

    this.http.post<Entity>('http://localhost:3000/entities', entityToAdd)
      .subscribe({
        next: () => {
          this.loadEntities();
          this.newEntity = { name: '', email: '' };
          this.errorMessage = '';
        },
        error: (err) => {
          console.error('Erro ao adicionar entidade', err);
          this.errorMessage = 'Não foi possível adicionar a entidade';
        }
      });
  }

  deleteEntity(id: string) {
    this.http.delete(`http://localhost:3000/entities/${id}`)
      .subscribe({
        next: () => {
          this.loadEntities();
          this.errorMessage = '';
        },
        error: (err) => {
          console.error('Erro ao excluir entidade', err);
          this.errorMessage = 'Não foi possível excluir a entidade';
        }
      });
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}