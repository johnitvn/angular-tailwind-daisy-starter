import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  heroHome,
  heroUser,
  heroComputerDesktop,
  heroCog6Tooth,
  heroArrowRightOnRectangle,
  heroChevronDown,
  heroBars3
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NgIconComponent],
  providers: [
    provideIcons({ 
      heroHome, 
      heroUser, 
      heroComputerDesktop, 
      heroCog6Tooth, 
      heroArrowRightOnRectangle,
      heroChevronDown,
      heroBars3
    })
  ],
  template: `
    <div class="min-h-screen bg-base-200">
      <!-- Navbar -->
      <div class="navbar bg-base-100 shadow-md lg:hidden">
        <div class="flex-none">
          <label for="dashboard-drawer" class="btn btn-square btn-ghost drawer-button">
            <ng-icon name="heroBars3" class="w-6 h-6"></ng-icon>
          </label>
        </div>
        <div class="flex-1">
          <span class="text-xl font-bold">Dashboard</span>
        </div>
        <div class="flex-none">
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar placeholder">
              <div class="bg-neutral text-neutral-content rounded-full w-10">
                <span>{{ getUserInitials() }}</span>
              </div>
            </label>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a routerLink="profile">Profile</a></li>
              <li><a routerLink="sessions">Sessions</a></li>
              <li><a (click)="logout()">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="drawer lg:drawer-open">
        <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
        
        <div class="drawer-content flex flex-col">
          <!-- Page content -->
          <div class="p-6">
            <router-outlet></router-outlet>
          </div>
        </div>
        
        <div class="drawer-side">
          <label for="dashboard-drawer" class="drawer-overlay"></label>
          <div class="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
            <!-- Branding -->
            <div class="flex items-center gap-2 px-2 mb-8">
              <div class="avatar placeholder">
                <div class="bg-primary text-primary-content rounded w-10">
                  <span class="text-xl">D</span>
                </div>
              </div>
              <div>
                <h1 class="text-xl font-bold">Dashboard</h1>
                <p class="text-sm opacity-70">Welcome back!</p>
              </div>
            </div>

            <!-- Navigation -->
            <ul class="menu menu-lg gap-2">
              <li>
                <a routerLink="/dashboard" 
                   routerLinkActive="active" 
                   [routerLinkActiveOptions]="{exact: true}"
                   class="flex items-center gap-4">
                  <ng-icon name="heroHome" class="w-5 h-5"></ng-icon>
                  Overview
                </a>
              </li>
              <li>
                <a routerLink="profile" 
                   routerLinkActive="active"
                   class="flex items-center gap-4">
                  <ng-icon name="heroUser" class="w-5 h-5"></ng-icon>
                  Profile
                </a>
              </li>
              <li>
                <a routerLink="sessions" 
                   routerLinkActive="active"
                   class="flex items-center gap-4">
                  <ng-icon name="heroComputerDesktop" class="w-5 h-5"></ng-icon>
                  Sessions
                </a>
              </li>
              <li>
                <a routerLink="settings" 
                   routerLinkActive="active"
                   class="flex items-center gap-4">
                  <ng-icon name="heroCog6Tooth" class="w-5 h-5"></ng-icon>
                  Settings
                </a>
              </li>
            </ul>

            <!-- User Menu -->
            <div class="mt-auto border-t pt-4">
              <div class="flex items-center gap-4 p-4">
                <div class="avatar placeholder">
                  <div class="bg-neutral text-neutral-content rounded-full w-10">
                    <span>{{ getUserInitials() }}</span>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-medium truncate">{{ getUserName() }}</p>
                  <p class="text-sm opacity-70 truncate">{{ getUserEmail() }}</p>
                </div>
                <button class="btn btn-ghost btn-circle" (click)="logout()">
                  <ng-icon name="heroArrowRightOnRectangle" class="w-5 h-5"></ng-icon>
                </button>
              </div>
            </div>
          </div>
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
    window.location.href = '/auth/login';
  }
}