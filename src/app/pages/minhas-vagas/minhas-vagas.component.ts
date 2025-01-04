import { Component } from '@angular/core';
import { IJob } from '../../interfaces/IJob';
import { JobService } from '../../services/job.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-minhas-vagas',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './minhas-vagas.component.html',
  styleUrls: ['./minhas-vagas.component.css'] 
})
export class MinhasVagasComponent {
  jobs: IJob[] = []; // Vagas onde o usuário está candidado
  userId: string | null = null; // ID do usuário, armazenado no localStorage

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId'); // Obtém o ID do usuário do localStorage
    if (this.userId) {
      // Carregar as vagas onde o usuário está na lista de candidatos
      this.loadUserJobs(this.userId);
    }
  }

 // Função para carregar as vagas em que o usuário está candidatado
loadUserJobs(userId: string): void {
  this.jobService.getJobs().subscribe((jobs) => {
    // Filtra as vagas onde o userId está presente no selectCandidate
    this.jobs = jobs.filter((job) => 
      Array.isArray(job.selectCandidate) && job.selectCandidate.some((candidate) => candidate.userId === userId)
    );
  });
}

// Função para desistir de uma vaga
withdrawApplication(jobId: string): void {
  if (this.userId) {
    this.jobService.getJobs().subscribe((jobs) => {
      const job = jobs.find((j) => j.id === jobId);
      if (job) {
        // Garante que selectCandidate seja um array antes de realizar a filtragem
        if (Array.isArray(job.selectCandidate)) {
          job.selectCandidate = job.selectCandidate.filter((candidate) => candidate.userId !== this.userId);
          
          // Atualiza a vaga no servidor
          this.jobService.updateJob(job).subscribe(() => {
            // Atualiza a lista de vagas na interface
            this.jobs = this.jobs.filter((job) => job.id !== jobId);
          });
        }
      }
    });
  }
}
}
