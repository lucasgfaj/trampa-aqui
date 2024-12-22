import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { JobApiComponent } from '../job-api/job-api.component';

@Component({
  selector: 'app-ver-vagas',
  standalone: true,
  imports: [MatIconModule, JobApiComponent],
  templateUrl: './ver-vagas.component.html',
  styleUrl: './ver-vagas.component.css'
})
export class VerVagasComponent {

}
