import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  heroEnvelope, 
  heroExclamationCircle,
  heroArrowPath
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIconComponent],
  providers: [
    provideIcons({ heroEnvelope, heroExclamationCircle, heroArrowPath })
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 flex items-center justify-center px-4">
      <div class="card w-full max-w-md bg-base-100 shadow-2xl">
        <div class="card-body space-y-6">
          <!-- Header -->
          <div class="text-center space-y-2">
            <div class="avatar placeholder online">
              <div class="bg-primary/10 text-primary rounded-full w-24">
                <ng-icon 
                  name="heroEnvelope"
                  class="w-12 h-12">
                </ng-icon>
              </div>
            </div>
            <h2 class="text-2xl font-bold">Verify Your Email</h2>
            <p class="text-base-content/70">
              We've sent a verification code to<br>
              <span class="font-medium text-primary">{{ email }}</span>
            </p>
          </div>
          
          <form [formGroup]="otpForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="grid grid-cols-6 gap-3 px-4">
              <input *ngFor="let control of otpControls; let i = index"
                     #otpInput
                     [formControlName]="'digit' + i"
                     type="text"
                     inputmode="numeric"
                     autocomplete="one-time-code"
                     maxlength="1"
                     class="input input-bordered w-full text-center text-2xl font-bold aspect-square p-0"
                     (keyup)="onKeyUp($event, i)"
                     (keydown)="onKeyDown($event)"
                     (paste)="onPaste($event)">
            </div>

            <div class="alert alert-error shadow-lg" *ngIf="errorMessage">
              <ng-icon 
                name="heroExclamationCircle"
                class="shrink-0 w-6 h-6">
              </ng-icon>
              <span>{{ errorMessage }}</span>
            </div>

            <div class="space-y-4">
              <button type="submit" 
                      class="btn btn-primary w-full" 
                      #verifyButton
                      [disabled]="!otpForm.valid || isLoading">
                <span class="loading loading-spinner" *ngIf="isLoading"></span>
                {{ isLoading ? 'Verifying...' : 'Verify Code' }}
              </button>

              <div class="flex flex-col gap-2 items-center text-sm">
                <p class="text-base-content/70">
                  Didn't receive the code? 
                  <button type="button" 
                          class="btn btn-link btn-sm px-2 normal-case"
                          [class.btn-disabled]="!canResend"
                          (click)="resendCode()">
                    <ng-icon 
                      name="heroArrowPath"
                      class="w-4 h-4"
                      [class.animate-spin]="isResending">
                    </ng-icon>
                    Resend {{ resendTimer > 0 ? '(' + resendTimer + 's)' : '' }}
                  </button>
                </p>
                <p class="text-base-content/50">
                  Attempts remaining: 
                  <span class="font-medium" [class.text-error]="attemptsLeft === 1">
                    {{ attemptsLeft }}
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class OtpVerificationComponent implements OnInit {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  
  otpForm: FormGroup;
  isLoading = false;
  isResending = false;
  resendTimer = 30;
  attemptsLeft = 3;
  canResend = false;
  errorMessage = '';
  email = '';
  private timerInterval: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
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
    this.email = sessionStorage.getItem('auth_email') || '';
    if (!this.email) {
      this.router.navigate(['/auth/login']);
      return;
    }
    this.startResendTimer();
    // Focus first input on component load
    setTimeout(() => {
      const firstInput = this.otpInputs.first;
      if (firstInput) {
        firstInput.nativeElement.focus();
      }
    }, 0);
  }

  onKeyDown(event: KeyboardEvent) {
    // Allow only numbers, backspace, delete, tab, arrows, enter
    if (
      !/^\d$/.test(event.key) &&
      !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(event.key)
    ) {
      event.preventDefault();
    }
  }

  onKeyUp(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const inputs = this.otpInputs.toArray();

    if (event.key === 'Backspace' || event.key === 'Delete') {
      if (index > 0 && !value) {
        inputs[index - 1].nativeElement.focus();
      }
    } else if (value) {
      if (index < 5) {
        inputs[index + 1].nativeElement.focus();
      } else {
        // On last input, focus verify button
        inputs[index].nativeElement.blur();
        const verifyButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;
        if (verifyButton && this.otpForm.valid) {
          verifyButton.focus();
        }
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData?.getData('text');
    if (!clipboardData) return;

    const numbers = clipboardData.replace(/\D/g, '').slice(0, 6).split('');
    const inputs = this.otpInputs.toArray();
    
    numbers.forEach((num, index) => {
      const control = this.otpForm.get(`digit${index}`);
      if (control) {
        control.setValue(num);
        if (index === 5) {
          inputs[index].nativeElement.blur();
          const verifyButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;
          if (verifyButton && this.otpForm.valid) {
            verifyButton.focus();
          }
        }
      }
    });
  }

  startResendTimer() {
    this.resendTimer = 30;
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
      this.isResending = true;
      this.attemptsLeft--;
      this.startResendTimer();
      
      this.authService.requestOTP(this.email).subscribe({
        next: () => {
          this.isResending = false;
          this.otpForm.reset();
          const firstInput = this.otpInputs.first;
          if (firstInput) {
            firstInput.nativeElement.focus();
          }
        },
        error: (error) => {
          this.isResending = false;
          this.errorMessage = error.message || 'Failed to resend OTP';
        }
      });
    }
  }

  onSubmit() {
    if (this.otpForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const otp = Object.values(this.otpForm.value).join('');
      this.authService.verifyOTP(this.email, otp).subscribe({
        next: () => {
          sessionStorage.removeItem('auth_email');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Invalid verification code';
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}