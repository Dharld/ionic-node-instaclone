import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = '/';

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    const body = {
      email,
      password,
    };
    return this.http
      .post(`${this.apiUrl}api/auth/signup`, body)
      .pipe(catchError((err) => this.handleError(err)));
  }

  login(email: string, password: string) {
    const body = {
      email,
      password,
    };
    return this.http
      .post(`${this.apiUrl}/api/auth/login`, body)
      .pipe(catchError((err) => this.handleError(err)));
  }

  signout() {
    return this.http
      .post(`${this.apiUrl}/api/auth/signout`, {})
      .pipe(catchError((err) => this.handleError(err)));
  }

  handleError(err: any) {
    console.log(err);
    return of(err);
  }
}
