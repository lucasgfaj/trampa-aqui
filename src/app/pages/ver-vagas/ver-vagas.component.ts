import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { JobApiComponent } from '../job-api/job-api.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-vagas',
  standalone: true,
  imports: [MatIconModule, JobApiComponent, CommonModule],
  templateUrl: './ver-vagas.component.html',
  styleUrl: './ver-vagas.component.css'
})
export class VerVagasComponent {
  secFilter: boolean = false;

  toggleVisibility() {
    this.secFilter = !this.secFilter;
  }

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.secFilter = window.innerWidth >= 1200;
  }

  ngOnInit() {
    this.onResize(null);
  }

  public openModal() {
        Swal.fire({
          title: 'Você tem certeza que deseja se candidatar a esta vaga?',
          text: "Você poderá perder o emprego dos seus sonhos!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Boa sorte!',
              'Vaga confirmada com sucesso!',
              'success'
            );
          }
        });
      };
    }

