import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  heroEnvelope, 
  heroInformationCircle,
  heroExclamationCircle,
  heroArrowRightOnRectangle
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIconComponent],
  providers: [
    provideIcons({ heroEnvelope, heroInformationCircle, heroExclamationCircle, heroArrowRightOnRectangle })
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 flex items-center justify-center px-4">
      <div class="card w-full max-w-md bg-base-100 shadow-2xl">
        <div class="card-body space-y-8">
          <!-- Header -->
          <div class="text-center">
            <h1 class="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to Our Platform
            </h1>
            <p class="text-base-content/70 mt-2">
              Sign in or create your account instantly
            </p>
          </div>

          <!-- Login Form -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Email Address</span>
              </label>
              <div class="relative">
                <ng-icon 
                  name="heroEnvelope"
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50">
                </ng-icon>
                <input 
                  type="email" 
                  formControlName="email" 
                  placeholder="Enter your email" 
                  class="input input-bordered w-full min-h-[44px] bg-base-200/50 focus:bg-base-100 pl-10" />
              </div>
              <label class="label" *ngIf="loginForm.get('email')?.touched && loginForm.get('email')?.invalid">
                <span class="label-text-alt text-error">Please enter a valid email</span>
              </label>
            </div>

                       <div class="alert alert-error shadow-lg" *ngIf="errorMessage">
              <ng-icon 
                name="heroExclamationCircle"
                class="shrink-0 w-6 h-6">
              </ng-icon>
              <span>{{ errorMessage }}</span>
            </div>

            <button type="submit" 
                    class="btn btn-primary w-full min-h-[44px] shadow-md hover:shadow-lg transition-all duration-200" 
                    [disabled]="!loginForm.valid || isLoading">
              <span class="loading loading-spinner" *ngIf="isLoading"></span>
              {{ isLoading ? 'Sending Code...' : 'Continue with Email' }}
            </button>

            <div class="divider text-base-content/50">OR</div>

            <button type="button" 
                    class="btn btn-outline w-full gap-2 min-h-[44px]"
                    (click)="loginWithGoogle()">
              <img src="https://www.google.com/favicon.ico" alt="Google" class="w-5 h-5" />
              Continue with Google
            </button>
          </form>

          <!-- Footer -->
          <div class="text-center text-sm text-base-content/70">
            <p>By continuing, you agree to our</p>
            <div class="space-x-1">
              <a href="#" class="link link-primary">Terms of Service</a>
              <span>&</span>
              <a href="#" class="link link-primary">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { email } = this.loginForm.value;
      this.authService.requestOTP(email).subscribe({
        next: () => {
          sessionStorage.setItem('auth_email', email);
          this.router.navigate(['/auth/verify']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Failed to send verification code';
        }
      });
    }
  }

  loginWithGoogle() {
    // Mock Google login
    this.authService.handleGoogleLogin({
      id: 'mock_id',
      email: 'user@gmail.com',
      name: 'Test User',
      photoUrl: 'https://example.com/photo.jpg'
    }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to login with Google';
      }
    });
  }
}