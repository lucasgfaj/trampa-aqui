import { IUser } from './../interfaces/IUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users'; // URL do JSON Server

  constructor(private http: HttpClient) { }


  //  getUser(): Observable<IUser[]> {
  //    return this.http.get<IUser[]>(this.apiUrl);
  //  }

  // getUser(): Promise<IUser[]> {
  //   return firstValueFrom(this.http.get<IUser[]>(this.apiUrl));
  // }

  getUser(): Promise<IUser[]> {
  return firstValueFrom(this.http.get<IUser[]>(this.apiUrl));
}
  updateUser(user: IUser) : Observable<IUser>{
    return this.http.put<IUser>(`${this.apiUrl}/${user.id}`, user);
  }

  createUser(user: IUser) : Observable<IUser>{
    return this.http.post<IUser>(`${this.apiUrl}`, user);
  }

  loginUser(user: IUser): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}?email=${user.email}&password=${user.password}`);
  }

  getUserById(userId: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${userId}`);
  }

  getUserByEmail(email: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}?email=${email}`);
  }
}
