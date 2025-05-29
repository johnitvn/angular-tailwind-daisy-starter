import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  constructor() {}

  login(email: string, password: string): Observable<any> {
    // Mock API response
    if (email === 'test@example.com' && password === 'password123') {
      const mockResponse = {
        token: 'mock_jwt_token',
        user: {
          id: '1',
          email,
          name: 'Test User'
        }
      };
      this.setSession(mockResponse);
      return of(mockResponse).pipe(delay(1000));
    }
    return throwError(() => new Error('Invalid credentials'));
  }

  register(userData: any): Observable<any> {
    // Mock registration
    return of({ success: true }).pipe(delay(1000));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private setSession(authResult: any): void {
    localStorage.setItem(this.TOKEN_KEY, authResult.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResult.user));
  }
}