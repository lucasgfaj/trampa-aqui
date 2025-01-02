import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';
import { ContractType, EnterpriseType, IJob, JobType, LanguageRequired, LocationDispobility, JobStatus } from '../../interfaces/IJob';


@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobForm: FormGroup;
  jobs: IJob[] = [];
  visibleCards: Set<string> = new Set();

  // Listas para os `<select>` no template
  enterpriseTypes = Object.values(EnterpriseType);
  jobTypes = Object.values(JobType);
  contractTypes = Object.values(ContractType);
  locationTypes = Object.values(LocationDispobility);
  languages = Object.values(LanguageRequired);

  constructor(private fb: FormBuilder, private jobService: JobService) {
    this.jobForm = this.fb.group({
      nameJob: ['', Validators.required],
      salary: ['', Validators.required],
      typeEnterprise: [EnterpriseType.null, Validators.required],
      typeJob: [JobType.null, Validators.required],
      typeContract: [ContractType.null, Validators.required],
      dispobilityLocation: [LocationDispobility.null, Validators.required],
      requiredLanguage: [LanguageRequired.null, Validators.required],
    });
  }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.jobService.getJobsByUser(userId).subscribe((jobs) => {
        this.jobs = jobs.filter((job) => job.status === 'aberta');
      });
    }
  }

  toggleVisibility(jobId: string) {
    if (this.visibleCards.has(jobId)) {
      this.visibleCards.delete(jobId);
    } else {
      this.visibleCards.add(jobId);
    }
  }

  isVisible(jobId: string): boolean {
    return this.visibleCards.has(jobId);
  }

  onSubmit() {
    if (this.jobForm.valid) {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Usuário não autenticado. Faça login novamente.');
        return;
      }

      const newJob: IJob = {
        ...this.jobForm.value,
        createdAt: new Date(),
        selectCandidate: [],
        userId,
        status: 'aberta'
      };

      this.jobService.createJob(newJob).subscribe({
        next: () => {
          alert('Vaga cadastrada com sucesso!');
          this.jobs.push(newJob); // Adiciona a vaga à lista
          this.jobForm.reset();
        },
        error: (err) => {
          console.error('Erro ao cadastrar a vaga:', err);
          alert('Erro ao cadastrar a vaga.');
        },
      });
    } else {
      alert('Preencha todos os campos obrigatórios.');
    }
  }

  finalizeJob(job: IJob) {
    if (job.selectCandidate && job.selectCandidate.length > 0) {
      const updatedJob = { ...job, status: JobStatus.finalizada };
      this.jobService.updateJob(updatedJob).subscribe(() => {
        this.jobs = this.jobs.filter((j) => j.id !== job.id);
      });
    } else {
      alert('Selecione um candidato antes de finalizar a vaga.');
    }
  }
  
  deleteJob(jobId: string) {
    const jobToDelete = this.jobs.find((job) => job.id === jobId);
    if (jobToDelete) {
      const updatedJob: IJob = {
        ...jobToDelete,
        status: JobStatus.excluida
      };
      this.jobService.updateJob(updatedJob).subscribe(() => {
        this.jobs = this.jobs.filter((job) => job.id !== jobId);
      });
    }
  }

  onReset() {
    this.jobForm.reset();
  }
}