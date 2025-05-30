import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  heroMagnifyingGlass,
  heroBell,
  heroSun
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [
    provideIcons({ 
      heroMagnifyingGlass,
      heroBell,
      heroSun
    })
  ],
  template: `
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 p-4 lg:p-6 bg-base-100">
      <div>
        <h1 class="text-2xl font-semibold">Welcome Back, Jhon!</h1>
      </div>
      
      <div class="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 w-full lg:w-auto">
        <div class="relative w-full lg:w-64">
          <input type="text" placeholder="Search" class="input input-bordered w-full pl-10" />
          <ng-icon 
            name="heroMagnifyingGlass" 
            class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          </ng-icon>
        </div>
        
        <div class="flex items-center gap-4">
          <button class="btn btn-ghost btn-circle">
            <div class="indicator">
              <span class="indicator-item badge badge-primary badge-xs"></span>
              <ng-icon name="heroBell" class="w-5 h-5"></ng-icon>
            </div>
          </button>
          
          <button class="btn btn-ghost btn-circle">
            <ng-icon name="heroSun" class="w-5 h-5"></ng-icon>
          </button>
          
          <div class="w-10 h-10 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  `
})
export class DashboardHeaderComponent {}