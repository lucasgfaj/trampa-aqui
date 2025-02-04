import { Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges} from '@angular/core';
import { IJob } from '../../interfaces/IJob';
import { JobService } from '../../services/job.service';
import { UserService } from '../../services/user.service'; 
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, MatPaginator],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})

export class JobListComponent implements OnInit, OnChanges {
  openJobs: IJob[] = [];
  pagedJobs: IJob[] = [];
  pageSize: number = 4;
  currentPage: number = 0;
  @Input() searchTerm: string = ''; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private jobService: JobService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm'] && !changes['searchTerm'].firstChange) {
      this.updatePagedJobs(); // Chama a atualização quando searchTerm mudar
    }
  }

  loadJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (jobs) => {
        this.openJobs = jobs.filter((job) => job.status === 'aberta');
        this.updatePagedJobs(); // Inicializa o filtro de vagas
      },
      error: (err) => {
        console.error('Erro ao carregar vagas:', err);
      }
    });
  }

  updatePagedJobs(): void {
    const filteredJobs = this.openJobs.filter(job => 
      job.nameJob.toLowerCase().includes(this.searchTerm.toLowerCase()) // Filtragem por nome da vaga
    );

    const startIndex = this.currentPage * this.pageSize;
    this.pagedJobs = filteredJobs.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedJobs(); // Atualiza a página ao mudar a página no paginator
  }
  
  public applyToJob(jobId: string): void {
    const userId = localStorage.getItem("userId");  // Recupera o userId do localStorage
  
    if (!userId) {
      // Se o userId não estiver no localStorage, redireciona para a página de login
      Swal.fire({
        title: 'Você precisa estar logado!',
        text: 'Por favor, faça login para se candidatar à vaga.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        window.location.href = '/login-candidato'; // Redireciona para a página de login
      });
      return;  // Impede o resto do código de ser executado
    }
  
    // Verifica se o usuário é do tipo 'developer'
    this.userService.getUserById(userId).subscribe(user => {
      if (user.typeuser !== 'developer') {
        Swal.fire({
          title: 'Apenas desenvolvedores podem se candidatar!',
          text: 'Seu tipo de usuário não é permitido para se candidatar a vagas de desenvolvimento.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
        });
        return;  // Impede que o usuário se candidate caso não seja um "developer"
      }
  
      // Encontrar o trabalho correto com base no jobId
      const job = this.openJobs.find(job => job.id === jobId);
      if (!job) {
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível encontrar a vaga selecionada.',
          icon: 'error',
        });
        return;  // Se não encontrar a vaga, não faz nada
      }
  
      // Verificar se o candidato já se aplicou
      const candidateAlreadyApplied = job.selectCandidate.some(candidate => candidate.userId === userId);
      if (candidateAlreadyApplied) {
        Swal.fire({
          title: 'Você já se candidatou a esta vaga!',
          text: 'Você já está registrado como candidato para essa vaga.',
          icon: 'info',
          confirmButtonColor: '#3085d6',
        });
        return;  // Impede que o usuário se candidate novamente
      }
  
      // Caso o userId esteja no localStorage e ainda não tenha se candidatado, continue a execução
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
          // Caso o usuário clique em "Sim", adiciona o candidato à vaga
          const userName = user.name || "Nome desconhecido";  // Garantir que userName não seja undefined
  
          if (!job.selectCandidate) {
            job.selectCandidate = [];  // Certifica-se de que o array exista
          }
  
          // Adiciona o candidato com userId e userName
          job.selectCandidate.push({ userId, userName });
  
          // Atualiza a vaga no backend com o novo candidato
          this.jobService.updateJob(job).subscribe(
            updatedJob => {
              Swal.fire(
                'Boa sorte!',
                'Sua candidatura foi confirmada com sucesso!',
                'success'
              );
              console.log(`Candidato se aplicou para a vaga com ID: ${jobId}`);
            },
            error => {
              Swal.fire({
                title: 'Erro ao atualizar vaga!',
                text: 'Não foi possível atualizar a vaga com o novo candidato.',
                icon: 'error',
              });
              console.error('Erro ao atualizar vaga:', error);
            }
          );
        } else {
          // Caso o usuário clique em "Cancelar", não faz nada
          console.log(`Candidatura para a vaga ${jobId} foi cancelada.`);
        }
      });
    }, error => {
      Swal.fire({
        title: 'Erro ao buscar dados do usuário!',
        text: 'Não foi possível localizar os dados do usuário.',
        icon: 'error',
      });
      console.error('Erro ao buscar o usuário:', error);
    });
  };
  
  
}
