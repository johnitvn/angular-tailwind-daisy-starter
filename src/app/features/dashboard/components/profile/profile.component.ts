import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold mb-6">Profile Settings</h2>
      
      <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <div class="flex items-center gap-4 mb-8">
          <div class="avatar placeholder">
            <div class="bg-neutral text-neutral-content rounded-full w-24">
              <span class="text-3xl">{{ getInitials() }}</span>
            </div>
          </div>
          <div>
            <h3 class="font-semibold">Profile Picture</h3>
            <p class="text-sm text-gray-500 mb-2">JPG or PNG. Max size of 5MB.</p>
            <input type="file" class="file-input file-input-bordered w-full max-w-xs"
                   accept=".jpg,.jpeg,.png" (change)="onFileChange($event)" />
          </div>
        </div>

        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Full Name</span>
            </label>
            <input type="text" formControlName="fullName" 
                   class="input input-bordered w-full" 
                   placeholder="Enter your full name" />
            <label class="label" *ngIf="profileForm.get('fullName')?.touched && profileForm.get('fullName')?.invalid">
              <span class="label-text-alt text-error">Name must be between 2 and 50 characters</span>
            </label>
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Email Address</span>
            </label>
            <input type="email" formControlName="email" 
                   class="input input-bordered w-full" 
                   placeholder="Enter your email" />
            <label class="label" *ngIf="profileForm.get('email')?.touched && profileForm.get('email')?.invalid">
              <span class="label-text-alt text-error">Please enter a valid email address</span>
            </label>
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Date of Birth</span>
            </label>
            <input type="date" formControlName="dateOfBirth" 
                   class="input input-bordered w-full" />
            <label class="label" *ngIf="profileForm.get('dateOfBirth')?.touched && profileForm.get('dateOfBirth')?.invalid">
              <span class="label-text-alt text-error">You must be at least 18 years old</span>
            </label>
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Phone Number</span>
            </label>
            <input type="tel" formControlName="phone" 
                   class="input input-bordered w-full" 
                   placeholder="+1 (555) 000-0000" />
            <label class="label" *ngIf="profileForm.get('phone')?.touched && profileForm.get('phone')?.invalid">
              <span class="label-text-alt text-error">Please enter a valid phone number</span>
            </label>
          </div>
        </div>

        <div class="form-control w-full mb-6">
          <label class="label">
            <span class="label-text">Address</span>
          </label>
          <input type="text" formControlName="address" 
                 class="input input-bordered w-full" 
                 placeholder="Enter your address" />
        </div>

        <div class="flex justify-end gap-4">
          <button type="button" class="btn" (click)="resetForm()">Reset</button>
          <button type="submit" class="btn btn-primary" [disabled]="!profileForm.valid || isLoading">
            {{ isLoading ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required, this.ageValidator]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      address: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Load user data
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const user = JSON.parse(userData);
      this.profileForm.patchValue({
        fullName: user.name,
        email: user.email,
      });
    }
  }

  ageValidator(control: any) {
    if (!control.value) return null;
    
    const birthDate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18 ? null : { underage: true };
  }

  getInitials(): string {
    const name = this.profileForm.get('fullName')?.value || '';
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // Show error message
        return;
      }
      // Handle file upload
    }
  }

  resetForm() {
    this.profileForm.reset();
    this.ngOnInit();
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        // Show success message
      }, 1500);
    }
  }
}