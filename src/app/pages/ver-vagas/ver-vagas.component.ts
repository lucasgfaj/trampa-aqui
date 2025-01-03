import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { JobApiComponent } from '../job-api/job-api.component';
import { CommonModule } from '@angular/common';
import { JobListComponent } from '../job-list/job-list.component';

@Component({
  selector: 'app-ver-vagas',
  standalone: true,
  imports: [MatIconModule, JobApiComponent, CommonModule, JobListComponent],
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
}
