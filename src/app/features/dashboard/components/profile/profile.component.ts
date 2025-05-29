import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  heroUser,
  heroEnvelope,
  heroPhone,
  heroMapPin,
  heroCalendar,
  heroCamera
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIconComponent],
  providers: [
    provideIcons({ 
      heroUser,
      heroEnvelope,
      heroPhone,
      heroMapPin,
      heroCalendar,
      heroCamera
    })
  ],
  template: `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Profile Card -->
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body items-center text-center space-y-4">
          <div class="relative">
            <div class="avatar placeholder">
              <div class="bg-neutral text-neutral-content rounded-xl w-24 h-24">
                <span class="text-3xl">{{ getInitials() }}</span>
              </div>
            </div>
            <button class="btn btn-circle btn-sm absolute bottom-0 right-0 bg-base-100">
              <ng-icon name="heroCamera" class="w-4 h-4"></ng-icon>
            </button>
          </div>
          
          <div>
            <h2 class="text-2xl font-bold">{{ profileForm.get('fullName')?.value || 'Your Name' }}</h2>
            <p class="text-base-content/70">{{ profileForm.get('email')?.value || 'your.email@example.com' }}</p>
          </div>

          <div class="stats stats-vertical shadow w-full">
            <div class="stat">
              <div class="stat-title">Account Status</div>
              <div class="stat-value text-success text-lg">Active</div>
            </div>
            
            <div class="stat">
              <div class="stat-title">Member Since</div>
              <div class="stat-value text-primary text-lg">Jan 2024</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Form -->
      <div class="lg:col-span-2">
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h2 class="card-title mb-6">Profile Information</h2>
            
            <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Full Name -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-medium">Full Name</span>
                  </label>
                  <div class="relative">
                    <ng-icon 
                      name="heroUser"
                      class="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50">
                    </ng-icon>
                    <input 
                      type="text" 
                      formControlName="fullName" 
                      placeholder="Enter your full name" 
                      class="input input-bordered w-full pl-10" />
                  </div>
                  <label class="label" *ngIf="profileForm.get('fullName')?.touched && profileForm.get('fullName')?.invalid">
                    <span class="label-text-alt text-error">Name must be between 2 and 50 characters</span>
                  </label>
                </div>

                <!-- Email -->
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
                      class="input input-bordered w-full pl-10" />
                  </div>
                  <label class="label" *ngIf="profileForm.get('email')?.touched && profileForm.get('email')?.invalid">
                    <span class="label-text-alt text-error">Please enter a valid email address</span>
                  </label>
                </div>

                <!-- Phone -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-medium">Phone Number</span>
                  </label>
                  <div class="relative">
                    <ng-icon 
                      name="heroPhone"
                      class="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50">
                    </ng-icon>
                    <input 
                      type="tel" 
                      formControlName="phone" 
                      placeholder="+1 (555) 000-0000" 
                      class="input input-bordered w-full pl-10" />
                  </div>
                  <label class="label" *ngIf="profileForm.get('phone')?.touched && profileForm.get('phone')?.invalid">
                    <span class="label-text-alt text-error">Please enter a valid phone number</span>
                  </label>
                </div>

                <!-- Date of Birth -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-medium">Date of Birth</span>
                  </label>
                  <div class="relative">
                    <ng-icon 
                      name="heroCalendar"
                      class="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50">
                    </ng-icon>
                    <input 
                      type="date" 
                      formControlName="dateOfBirth" 
                      class="input input-bordered w-full pl-10" />
                  </div>
                  <label class="label" *ngIf="profileForm.get('dateOfBirth')?.touched && profileForm.get('dateOfBirth')?.invalid">
                    <span class="label-text-alt text-error">You must be at least 18 years old</span>
                  </label>
                </div>
              </div>

              <!-- Address -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-medium">Address</span>
                </label>
                <div class="relative">
                  <ng-icon 
                    name="heroMapPin"
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50">
                  </ng-icon>
                  <input 
                    type="text" 
                    formControlName="address" 
                    placeholder="Enter your address" 
                    class="input input-bordered w-full pl-10" />
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex justify-end gap-4">
                <button type="button" 
                        class="btn btn-ghost" 
                        (click)="resetForm()">
                  Reset
                </button>
                <button type="submit" 
                        class="btn btn-primary" 
                        [disabled]="!profileForm.valid || isLoading">
                  <span class="loading loading-spinner" *ngIf="isLoading"></span>
                  {{ isLoading ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Additional Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <!-- Security Settings -->
          <div class="card bg-base-100 shadow-lg">
            <div class="card-body">
              <h3 class="card-title text-lg mb-4">Security Settings</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium">Two-Factor Authentication</p>
                    <p class="text-sm text-base-content/70">Add an extra layer of security</p>
                  </div>
                  <input type="checkbox" class="toggle toggle-primary" />
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium">Login Notifications</p>
                    <p class="text-sm text-base-content/70">Get notified of new logins</p>
                  </div>
                  <input type="checkbox" class="toggle toggle-primary" checked />
                </div>
              </div>
            </div>
          </div>

          <!-- Preferences -->
          <div class="card bg-base-100 shadow-lg">
            <div class="card-body">
              <h3 class="card-title text-lg mb-4">Preferences</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium">Email Notifications</p>
                    <p class="text-sm text-base-content/70">Receive email updates</p>
                  </div>
                  <input type="checkbox" class="toggle toggle-primary" checked />
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium">SMS Notifications</p>
                    <p class="text-sm text-base-content/70">Get SMS alerts</p>
                  </div>
                  <input type="checkbox" class="toggle toggle-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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