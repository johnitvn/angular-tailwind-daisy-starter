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

  requestOTP(email: string): Observable<any> {
    // Mock API response for OTP request
    if (email.includes('@')) {
      return of({ success: true, message: 'OTP sent successfully' }).pipe(delay(1000));
    }
    return throwError(() => new Error('Invalid email address'));
  }

  verifyOTP(email: string, otp: string): Observable<any> {
    // Mock API response for OTP verification
    if (otp === '123456') { // For testing purposes
      const mockResponse = {
        token: 'mock_jwt_token',
        user: {
          id: '1',
          email,
          name: email.split('@')[0]
        }
      };
      this.setSession(mockResponse);
      return of(mockResponse).pipe(delay(1000));
    }
    return throwError(() => new Error('Invalid OTP'));
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