import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { environmentApi } from '../../environments/enviroments.api';

@Component({
  selector: 'app-job-api',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './job-api.component.html',
  styleUrl: './job-api.component.css',
  providers: [HttpClient],
})
export class JobApiComponent implements OnInit {
  job: any = null;
  isError = false;

  private apiUrl = environmentApi.apiUrl;

  public startApi(): string {
    let startApi: boolean = false;
    let apiKey: string = '';
    if (startApi) {
      apiKey = environmentApi.rapidApiKey;
    }
    return apiKey;
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'x-rapidapi-key': this.startApi(),
      'x-rapidapi-host': environmentApi.rapidApiHost,
    })
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchJob();
  }

  fetchJob(): void {
    const queryParams = '?query=Web%20Developer&location=EUA&autoTranslateLocation=true&remoteOnly=true&employmentTypes=fulltime%3Bparttime%3Bintern%3Bcontractor';

    this.http.get(`${this.apiUrl}${queryParams}`, this.httpOptions).subscribe({
      next: (response: any) => {
        if (response.jobs && response.jobs.length > 0) {
          this.job = response.jobs[1]; // Pega o primeiro anúncio
        } else {
          this.job = null;
        }
      },
      error: (err) => {
        console.error(err);
        this.isError = true;
      }
    });
  }

  openJobLink(): void {
    if (this.job?.jobProviders?.[0]?.url) {
      window.open(this.job.jobProviders[0].url, '_blank');
    }
  }

}

