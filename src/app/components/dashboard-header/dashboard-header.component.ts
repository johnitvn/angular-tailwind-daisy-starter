import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex justify-between items-center p-6 bg-base-100">
      <div>
        <h1 class="text-2xl font-semibold">Welcome Back, Jhon!</h1>
      </div>
      
      <div class="flex items-center gap-6">
        <div class="relative">
          <input type="text" placeholder="Search" class="input input-bordered w-64" />
          <span class="absolute right-3 top-1/2 transform -translate-y-1/2">🔍</span>
        </div>
        
        <button class="btn btn-ghost btn-circle">
          <div class="indicator">
            <span class="indicator-item badge badge-primary badge-xs"></span>
            <span>🔔</span>
          </div>
        </button>
        
        <button class="btn btn-ghost btn-circle">☀️</button>
        
        <div class="w-10 h-10 rounded-full bg-gray-300"></div>
      </div>
    </div>
  `
})
export class DashboardHeaderComponent {}