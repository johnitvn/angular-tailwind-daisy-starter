import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  heroHome,
  heroUser,
  heroComputerDesktop,
  heroCog6Tooth,
  heroArrowRightOnRectangle,
  heroChevronDown,
  heroBars3,
  heroWallet,
  heroBell,
  heroEnvelope
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive, NgIconComponent],
  providers: [
    provideIcons({ 
      heroHome, 
      heroUser, 
      heroComputerDesktop, 
      heroCog6Tooth, 
      heroArrowRightOnRectangle,
      heroChevronDown,
      heroBars3,
      heroWallet,
      heroBell,
      heroEnvelope
    })
  ],
  template: `
    <div class="min-h-screen bg-base-200/50">
      <!-- Fixed Header -->
      <div class="fixed top-0 left-[280px] right-0 bg-base-100 z-10">
        <div class="navbar min-h-[70px] px-6">
          <div class="flex-1">
            <div class="text-sm breadcrumbs">
              <ul>
                <li>Dashboard</li>
                <li>My Profile</li>
              </ul>
            </div>
          </div>
          <div class="flex-none gap-6">
            <!-- Notifications -->
            <div class="flex items-center gap-4">
              <button class="btn btn-ghost btn-circle">
                <div class="indicator">
                  <ng-icon name="heroBell" class="w-5 h-5"></ng-icon>
                  <span class="badge badge-sm badge-primary indicator-item">2</span>
                </div>
              </button>
              <button class="btn btn-ghost btn-circle">
                <div class="indicator">
                  <ng-icon name="heroEnvelope" class="w-5 h-5"></ng-icon>
                  <span class="badge badge-sm badge-primary indicator-item">4</span>
                </div>
              </button>
            </div>

            <!-- User Menu -->
            <div class="dropdown dropdown-end">
              <div class="flex items-center gap-3" tabindex="0" role="button">
                <div class="avatar placeholder">
                  <div class="bg-neutral text-neutral-content rounded-xl w-10">
                    <span>{{ getUserInitials() }}</span>
                  </div>
                </div>
                <div class="hidden md:block text-right">
                  <p class="font-medium">{{ getUserName() }}</p>
                  <p class="text-xs opacity-50">{{ getUserEmail() }}</p>
                </div>
                <ng-icon name="heroChevronDown" class="w-4 h-4 opacity-50"></ng-icon>
              </div>
              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-2">
                <li><a routerLink="profile">Profile</a></li>
                <li><a routerLink="settings">Settings</a></li>
                <li><hr class="my-1"></li>
                <li><a (click)="logout()">Sign Out</a></li>
              </ul>
            </div>
          </div>
        </div>
        <!-- Rounded corner decoration -->
        <div class="absolute left-0 top-[70px] w-6 h-6 bg-base-100">
          <div class="absolute inset-0 bg-base-200/50 rounded-tl-xl"></div>
        </div>
      </div>

      <!-- Fixed Sidebar -->
      <div class="fixed top-0 left-0 h-screen w-[280px] bg-base-100 z-20 flex flex-col">
        <!-- Logo -->
        <div class="p-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
              <div class="text-white text-xl font-bold">F</div>
            </div>
            <div>
              <h1 class="text-xl font-bold">My Finance</h1>
              <p class="text-xs opacity-50">Payment Portal</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6">
          <ul class="menu menu-lg gap-2">
            <li>
              <a routerLink="/dashboard" 
                 routerLinkActive="active" 
                 [routerLinkActiveOptions]="{ exact: true }"
                 class="flex items-center gap-4 min-h-12 rounded-xl">
                <ng-icon name="heroHome" class="w-5 h-5"></ng-icon>
                Overview
              </a>
            </li>
            <li>
              <a routerLink="profile" 
                 routerLinkActive="active"
                 class="flex items-center gap-4 min-h-12 rounded-xl">
                <ng-icon name="heroUser" class="w-5 h-5"></ng-icon>
                Profile
              </a>
            </li>
            <li>
              <a routerLink="sessions" 
                 routerLinkActive="active"
                 class="flex items-center gap-4 min-h-12 rounded-xl">
                <ng-icon name="heroComputerDesktop" class="w-5 h-5"></ng-icon>
                Sessions
              </a>
            </li>
            <li>
              <a routerLink="settings" 
                 routerLinkActive="active"
                 class="flex items-center gap-4 min-h-12 rounded-xl">
                <ng-icon name="heroCog6Tooth" class="w-5 h-5"></ng-icon>
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Main Content -->
      <div class="pl-[280px] pt-[70px]">
        <div class="p-6">
          <router-outlet></router-outlet>
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