import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <div class="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
      
      <div class="drawer-content flex flex-col">
        <!-- Navbar -->
        <div class="navbar bg-base-100 lg:hidden">
          <div class="flex-none">
            <label for="dashboard-drawer" class="btn btn-square btn-ghost drawer-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div class="flex-1">
            <span class="text-xl">Dashboard</span>
          </div>
        </div>

        <!-- Page content -->
        <div class="p-4 lg:p-8">
          <router-outlet></router-outlet>
        </div>
      </div>
      
      <div class="drawer-side">
        <label for="dashboard-drawer" class="drawer-overlay"></label>
        <div class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <div class="flex flex-col gap-2 mb-4">
            <div class="avatar placeholder">
              <div class="bg-neutral text-neutral-content rounded-full w-16">
                <span class="text-xl">{{ getUserInitials() }}</span>
              </div>
            </div>
            <div>
              <h3 class="font-bold">{{ getUserName() }}</h3>
              <p class="text-sm opacity-70">{{ getUserEmail() }}</p>
            </div>
          </div>
          
          <ul class="menu menu-lg gap-2">
            <li>
              <a routerLink="profile" routerLinkActive="active">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </a>
            </li>
            <li>
              <a routerLink="sessions" routerLinkActive="active">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Active Sessions
              </a>
            </li>
            <li>
              <button (click)="logout()" class="text-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  getUserInitials(): string {
    const name = this.getUserName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getUserName(): string {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const user = JSON.parse(userData);
      return user.name || 'User';
    }
    return 'User';
  }

  getUserEmail(): string {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const user = JSON.parse(userData);
      return user.email || 'user@example.com';
    }
    return 'user@example.com';
  }

  logout() {
    this.authService.logout();
  }
}