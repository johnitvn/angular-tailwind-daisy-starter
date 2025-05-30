import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { StatsCardsComponent } from './components/stats-cards/stats-cards.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidebarComponent, DashboardHeaderComponent, StatsCardsComponent],
  template: `
    <div class="flex min-h-screen bg-base-200">
      <app-sidebar></app-sidebar>
      <div class="flex-1 lg:ml-0 flex flex-col">
        <app-dashboard-header class="sticky top-0 z-30"></app-dashboard-header>
        <main class="flex-1 p-4 lg:p-6 overflow-auto">
          <app-stats-cards></app-stats-cards>
          
          <!-- Automation Overview Section -->
          <div class="bg-base-100 rounded-lg p-4 lg:p-6 mb-8">
            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
              <h2 class="text-xl font-semibold">Automation Overview</h2>
              <select class="select select-bordered w-full lg:w-32">
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <!-- Placeholder for chart -->
            <div class="h-64 bg-base-200 rounded-lg"></div>
          </div>
          
          <!-- Medsos Overview Section -->
          <div class="bg-base-100 rounded-lg p-4 lg:p-6">
            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
              <h2 class="text-xl font-semibold">Medsos Overview</h2>
              <select class="select select-bordered w-full lg:w-32">
                <option>Monthly</option>
                <option>Weekly</option>
              </select>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Social Media Stats -->
              <div class="space-y-4">
                <div class="p-4 bg-base-200 rounded-lg">
                  <div class="flex justify-between items-center mb-2">
                    <span class="font-semibold">Instagram</span>
                    <span class="text-sm">22.3k Followers</span>
                  </div>
                  <div class="flex justify-between text-sm text-gray-500">
                    <span>Engagement: 8.7%</span>
                    <span>Posts: 320</span>
                  </div>
                </div>
                
                <div class="p-4 bg-base-200 rounded-lg">
                  <div class="flex justify-between items-center mb-2">
                    <span class="font-semibold">Facebook</span>
                    <span class="text-sm">18.7k Followers</span>
                  </div>
                  <div class="flex justify-between text-sm text-gray-500">
                    <span>Engagement: 6.4%</span>
                    <span>Posts: 290</span>
                  </div>
                </div>
              </div>
              
              <div class="space-y-4">
                <div class="p-4 bg-base-200 rounded-lg">
                  <div class="flex justify-between items-center mb-2">
                    <span class="font-semibold">X (Twitter)</span>
                    <span class="text-sm">9.1k Followers</span>
                  </div>
                  <div class="flex justify-between text-sm text-gray-500">
                    <span>Engagement: 10.2%</span>
                    <span>Posts: 150</span>
                  </div>
                </div>
                
                <div class="p-4 bg-base-200 rounded-lg">
                  <div class="flex justify-between items-center mb-2">
                    <span class="font-semibold">TikTok</span>
                    <span class="text-sm">12.4k Followers</span>
                  </div>
                  <div class="flex justify-between text-sm text-gray-500">
                    <span>Engagement: 14.5%</span>
                    <span>Posts: 210</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: ``
})
export class AppComponent {
  title = 'angular-tailwind-daisyui';
}