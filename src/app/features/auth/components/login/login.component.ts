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
    <div class="min-h-screen relative bg-gradient-to-br from-base-300 to-base-100 flex items-center justify-center p-4 overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute w-[800px] h-[800px] -top-[400px] -left-[400px]">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full filter blur-3xl pulse-slow"></div>
        </div>
        <div class="absolute w-[600px] h-[600px] -bottom-[300px] -right-[300px]">
          <div class="absolute inset-0 bg-gradient-to-br from-secondary/40 to-accent/40 rounded-full filter blur-3xl pulse-slow" style="animation-delay: -4s;"></div>
        </div>
      </div>

      <div class="card w-full max-w-md bg-base-100/70 glass-effect shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl">
        <div class="card-body space-y-8">
          <!-- Header -->
          <div class="text-center space-y-3">
            <div class="avatar placeholder online mb-4 floating">
              <div class="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary rounded-full w-24">
                <span class="text-3xl">W</span>
              </div>
            </div>
            <h1 class="text-4xl font-bold text-base-content">Welcome Back</h1>
            <p class="text-base-content/70">
              Sign in to your account or create a new one instantly
            </p>
          </div>

          <!-- Login Form -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="form-control">
              <div class="relative group">
                <ng-icon 
                  name="heroEnvelope"
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 w-5 h-5 transition-colors group-focus-within:text-primary">
                </ng-icon>
                <input 
                  type="email" 
                  formControlName="email" 
                  placeholder="Enter your email" 
                  class="input input-bordered w-full pl-10 min-h-12 bg-base-100/50 focus:bg-base-100 transition-all duration-300 border-2" />
              </div>
              <label class="label" *ngIf="loginForm.get('email')?.touched && loginForm.get('email')?.invalid">
                <span class="label-text-alt text-error flex items-center gap-1">
                  <ng-icon name="heroExclamationCircle" class="w-4 h-4"></ng-icon>
                  Please enter a valid email
                </span>
              </label>
            </div>

            <div class="alert alert-error shadow-lg" *ngIf="errorMessage">
              <ng-icon name="heroExclamationCircle" class="w-6 h-6"></ng-icon>
              <span>{{ errorMessage }}</span>
            </div>

            <div class="space-y-4">
              <button type="submit" 
                      class="btn btn-primary w-full min-h-12 shadow-lg hover:shadow-primary/30 transition-all duration-300" 
                      [disabled]="!loginForm.valid || isLoading">
                <span class="loading loading-spinner" *ngIf="isLoading"></span>
                {{ isLoading ? 'Sending Code...' : 'Continue with Email' }}
              </button>

              <div class="divider text-base-content/50">OR</div>

              <button type="button" 
                      class="btn bg-base-100 hover:bg-base-200 w-full gap-2 min-h-12 transition-all duration-300 border-2"
                      (click)="loginWithGoogle()">
                <img src="https://www.google.com/favicon.ico" alt="Google" class="w-5 h-5" />
                Continue with Google
              </button>
            </div>
          </form>

          <!-- Info Cards -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-base-100/50 rounded-lg p-4 text-center backdrop-blur-sm border border-base-200">
              <div class="stat-title text-xs">Instant Access</div>
              <div class="stat-value text-primary text-xl">2 Seconds</div>
              <div class="stat-desc text-xs">Average login time</div>
            </div>
            <div class="bg-base-100/50 rounded-lg p-4 text-center backdrop-blur-sm border border-base-200">
              <div class="stat-title text-xs">Secure Login</div>
              <div class="stat-value text-secondary text-xl">256-bit</div>
              <div class="stat-desc text-xs">SSL encryption</div>
            </div>
          </div>

          <!-- Footer -->
          <div class="text-center space-y-2">
            <p class="text-sm text-base-content/70">
              By continuing, you agree to our
            </p>
            <div class="flex justify-center gap-2 text-sm">
              <a href="#" class="link link-hover text-primary">Terms of Service</a>
              <span class="text-base-content/50">&</span>
              <a href="#" class="link link-hover text-primary">Privacy Policy</a>
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