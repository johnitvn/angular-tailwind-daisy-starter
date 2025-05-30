import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-screen w-64 bg-base-200 p-4 flex flex-col">
      <div class="flex items-center gap-2 mb-8">
        <div class="w-8 h-8 bg-primary rounded-lg"></div>
        <span class="text-xl font-bold">Automoz</span>
      </div>

      <div class="flex items-center gap-3 p-3 bg-base-100 rounded-lg mb-8">
        <div class="w-10 h-10 rounded-full bg-gray-300"></div>
        <div>
          <h3 class="font-medium">Jhon Steve</h3>
          <p class="text-sm text-gray-500">jhonsteve@gmail.com</p>
        </div>
      </div>

      <nav class="flex-1">
        <div class="mb-4">
          <h4 class="text-xs font-semibold text-gray-500 mb-2 px-3">MAIN MENU</h4>
          <ul class="space-y-1">
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">Dashboard</a></li>
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">Automate</a></li>
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">Post Scheduler</a></li>
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">Accounts</a></li>
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">Analytics</a></li>
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">Content Calendar</a></li>
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">Reports</a></li>
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">Team Collaboration</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-semibold text-gray-500 mb-2 px-3">PREFERENCE</h4>
          <ul class="space-y-1">
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">Settings</a></li>
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">Help Center</a></li>
          </ul>
        </div>
      </nav>

      <div class="mt-auto">
        <div class="bg-base-100 p-4 rounded-lg text-center">
          <h3 class="font-semibold mb-2">Upgrade Your Plan</h3>
          <p class="text-sm text-gray-500 mb-4">Enjoy more advanced features by upgrading to an enterprise plan</p>
          <button class="btn btn-primary w-full">Upgrade Plan</button>
          <a href="#" class="text-sm text-primary mt-2 block">View Pricing</a>
        </div>
      </div>
    </div>
  `
})
export class SidebarComponent {}