import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { SocialAuthService, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GoogleSigninButtonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 flex items-center justify-center px-4">
      <div class="card w-full max-w-md bg-base-100 shadow-2xl">
        <div class="card-body space-y-8">
          <!-- Header -->
          <div class="text-center">
            <h1 class="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p class="text-base-content/70 mt-2">
              Sign in to your account or create a new one
            </p>
          </div>

          <!-- Login Form -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Email Address</span>
              </label>
              <input type="email" 
                     formControlName="email" 
                     placeholder="Enter your email" 
                     class="input input-bordered w-full min-h-[44px] bg-base-200/50 focus:bg-base-100" />
              <label class="label" *ngIf="loginForm.get('email')?.touched && loginForm.get('email')?.invalid">
                <span class="label-text-alt text-error">Please enter a valid email</span>
              </label>
            </div>

            <div class="alert alert-info shadow-lg" *ngIf="!errorMessage">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h3 class="font-bold">New to our platform?</h3>
                <div class="text-xs">Don't worry! We'll automatically create an account for you.</div>
              </div>
            </div>

            <div class="alert alert-error shadow-lg" *ngIf="errorMessage">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ errorMessage }}</span>
            </div>

            <button type="submit" 
                    class="btn btn-primary w-full min-h-[44px] shadow-md hover:shadow-lg transition-all duration-200" 
                    [disabled]="!loginForm.valid || isLoading">
              <span class="loading loading-spinner" *ngIf="isLoading"></span>
              {{ isLoading ? 'Sending OTP...' : 'Continue with Email' }}
            </button>

            <div class="divider text-base-content/50">OR</div>

            <div class="space-y-4">
              <asl-google-signin-button
                type="standard"
                size="large"
                width="360"
                class="flex justify-center">
              </asl-google-signin-button>
            </div>
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
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.authService.handleGoogleLogin(user).subscribe({
          next: () => {
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            this.errorMessage = error.message || 'Failed to login with Google';
          }
        });
      }
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
          this.errorMessage = error.message || 'Failed to send OTP';
        }
      });
    }
  }
}