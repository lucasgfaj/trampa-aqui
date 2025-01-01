import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJob } from '../interfaces/IJob';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:3000/jobs'; // URL do JSON Server

  constructor(private http: HttpClient) {}

  getJobs(): Observable<IJob[]> {
    return this.http.get<IJob[]>(this.apiUrl);
  }

  createJob(job: IJob): Observable<IJob> {
    return this.http.post<IJob>(this.apiUrl, job);
  }
}
