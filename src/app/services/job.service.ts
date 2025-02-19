import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
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

  // getJobs(): Promise<IJob[]> {
  //   return firstValueFrom(this.http.get<IJob[]>(this.apiUrl));
  // }

  createJob(job: IJob): Observable<IJob> {
    return this.http.post<IJob>(this.apiUrl, job);
  }

  getJobsByUser(userId: string): Observable<IJob[]> {
    return this.http.get<IJob[]>(`${this.apiUrl}?userId=${userId}`);
  }

  deleteJob(jobId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${jobId}`);
  }

  updateJob(job: IJob): Observable<IJob> {
    return this.http.put<IJob>(`${this.apiUrl}/${job.id}`, job);
  }
}