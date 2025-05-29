import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div class="card w-full max-w-md bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl font-bold mb-6">Login</h2>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input type="email" formControlName="email" 
                     placeholder="Enter your email" 
                     class="input input-bordered w-full min-h-[44px]" />
              <label class="label" *ngIf="loginForm.get('email')?.touched && loginForm.get('email')?.invalid">
                <span class="label-text-alt text-error">Please enter a valid email</span>
              </label>
            </div>

            <div class="alert alert-error" *ngIf="errorMessage">
              <span>{{ errorMessage }}</span>
            </div>

            <button type="submit" class="btn btn-primary w-full min-h-[44px]" 
                    [disabled]="!loginForm.valid || isLoading">
              <span class="loading loading-spinner" *ngIf="isLoading"></span>
              {{ isLoading ? 'Sending OTP...' : 'Request OTP' }}
            </button>
          </form>
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
          this.errorMessage = error.message || 'Failed to send OTP';
        }
      });
    }
  }
}