import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div class="card w-full max-w-md bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Verify Your Email</h2>
          <p class="text-sm text-gray-600">Enter the 6-digit code sent to your email</p>
          
          <form [formGroup]="otpForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div class="grid grid-cols-6 gap-2">
              <input *ngFor="let control of otpControls; let i = index"
                     [formControlName]="'digit' + i"
                     type="text"
                     maxlength="1"
                     class="input input-bordered w-full text-center"
                     (keyup)="onKeyUp($event, i)"
                     (paste)="onPaste($event)">
            </div>

            <div class="flex justify-between items-center">
              <button type="button" 
                      class="btn btn-link" 
                      [disabled]="!canResend"
                      (click)="resendCode()">
                Resend Code {{ resendTimer > 0 ? '(' + resendTimer + 's)' : '' }}
              </button>
              <span class="text-sm">Attempts left: {{ attemptsLeft }}</span>
            </div>

            <button type="submit" 
                    class="btn btn-primary w-full" 
                    [disabled]="!otpForm.valid || isLoading">
              {{ isLoading ? 'Verifying...' : 'Verify' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class OtpVerificationComponent implements OnInit {
  otpForm: FormGroup;
  isLoading = false;
  resendTimer = 60;
  attemptsLeft = 3;
  canResend = false;
  private timerInterval: any;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.otpForm = this.fb.group({
      digit0: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit1: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit2: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit3: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit4: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit5: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
    });
  }

  get otpControls() {
    return Array(6).fill(0);
  }

  ngOnInit() {
    this.startResendTimer();
  }

  onKeyUp(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length === 1 && index < 5) {
      const nextInput = document.querySelector(`input[formControlName=digit${index + 1}]`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    } else if (event.key === 'Backspace' && index > 0 && !value) {
      const prevInput = document.querySelector(`input[formControlName=digit${index - 1}]`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData?.getData('text');
    if (!clipboardData) return;

    const numbers = clipboardData.replace(/\D/g, '').slice(0, 6).split('');
    numbers.forEach((num, index) => {
      this.otpForm.get(`digit${index}`)?.setValue(num);
    });
  }

  startResendTimer() {
    this.resendTimer = 60;
    this.canResend = false;
    
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      if (this.resendTimer > 0) {
        this.resendTimer--;
      } else {
        this.canResend = true;
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  resendCode() {
    if (this.attemptsLeft > 0 && this.canResend) {
      this.attemptsLeft--;
      this.startResendTimer();
      // Implement resend logic here
    }
  }

  onSubmit() {
    if (this.otpForm.valid) {
      this.isLoading = true;
      const otp = Object.values(this.otpForm.value).join('');
      
      // Mock verification
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      }, 1500);
    }
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}