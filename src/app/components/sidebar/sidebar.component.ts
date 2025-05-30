import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  heroHome, 
  heroRocketLaunch,
  heroCalendarDays,
  heroUserGroup,
  heroChartBar,
  heroClipboardDocument,
  heroDocumentText,
  heroCog6Tooth,
  heroQuestionMarkCircle,
  heroUsers
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [
    provideIcons({ 
      heroHome, 
      heroRocketLaunch,
      heroCalendarDays,
      heroUserGroup,
      heroChartBar,
      heroClipboardDocument,
      heroDocumentText,
      heroCog6Tooth,
      heroQuestionMarkCircle,
      heroUsers
    })
  ],
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
          <p class="text-sm text-gray-500">jhonsteve&#64;gmail.com</p>
        </div>
      </div>

      <nav class="flex-1">
        <div class="mb-4">
          <h4 class="text-xs font-semibold text-gray-500 mb-2 px-3">MAIN MENU</h4>
          <ul class="space-y-1">
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">
              <ng-icon name="heroHome" class="w-5 h-5"></ng-icon>
              Dashboard
            </a></li>
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">
              <ng-icon name="heroRocketLaunch" class="w-5 h-5"></ng-icon>
              Automate
            </a></li>
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">
              <ng-icon name="heroCalendarDays" class="w-5 h-5"></ng-icon>
              Post Scheduler
            </a></li>
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">
              <ng-icon name="heroUserGroup" class="w-5 h-5"></ng-icon>
              Accounts
            </a></li>
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">
              <ng-icon name="heroChartBar" class="w-5 h-5"></ng-icon>
              Analytics
            </a></li>
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">
              <ng-icon name="heroCalendarDays" class="w-5 h-5"></ng-icon>
              Content Calendar
            </a></li>
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">
              <ng-icon name="heroDocumentText" class="w-5 h-5"></ng-icon>
              Reports
            </a></li>
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">
              <ng-icon name="heroUsers" class="w-5 h-5"></ng-icon>
              Team Collaboration
            </a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-semibold text-gray-500 mb-2 px-3">PREFERENCE</h4>
          <ul class="space-y-1">
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">
              <ng-icon name="heroCog6Tooth" class="w-5 h-5"></ng-icon>
              Settings
            </a></li>
            <li><a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">
              <ng-icon name="heroQuestionMarkCircle" class="w-5 h-5"></ng-icon>
              Help Center
            </a></li>
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