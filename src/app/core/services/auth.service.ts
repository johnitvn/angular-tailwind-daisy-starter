import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private refreshTokenTimeout: any;

  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }

  private loadStoredUser() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
      this.startRefreshTokenTimer();
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        map(response => {
          const user = response;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.startRefreshTokenTimer();
          return user;
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, userData)
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  logout() {
    this.http.post<any>(`${environment.apiUrl}/auth/logout`, {}).subscribe();
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.stopRefreshTokenTimer();
  }

  refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/auth/refresh-token`, {})
      .pipe(
        tap(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.startRefreshTokenTimer();
        })
      );
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  private startRefreshTokenTimer() {
    const user = this.currentUserSubject.value;
    if (!user) return;

    const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}