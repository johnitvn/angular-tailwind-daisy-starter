import { Component, signal } from '@angular/core';
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
  heroUsers,
  heroChevronDown,
  heroChevronRight,
  heroChevronLeft,
  heroBars3
} from '@ng-icons/heroicons/outline';

interface MenuItem {
  icon: string;
  label: string;
  link?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

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
      heroUsers,
      heroChevronDown,
      heroChevronRight,
      heroChevronLeft,
      heroBars3
    })
  ],
  template: `
    <!-- Mobile Menu Button -->
    <button 
      class="lg:hidden fixed top-4 left-4 z-50 btn btn-circle btn-ghost"
      (click)="toggleMobileMenu()">
      <ng-icon name="heroBars3" class="w-6 h-6"></ng-icon>
    </button>

    <!-- Sidebar -->
    <div 
      [class.w-64]="!isCollapsed()"
      [class.w-16]="isCollapsed()"
      [class.translate-x-0]="isMobileMenuOpen()"
      [class.translate-x-[-100%]]="!isMobileMenuOpen()"
      class="h-screen bg-base-200 p-4 flex flex-col fixed lg:relative transition-all duration-300 z-40 lg:translate-x-0">
      
      <!-- Logo -->
      <div class="flex items-center gap-2 mb-8" [class.justify-center]="isCollapsed()">
        <div class="w-8 h-8 bg-primary rounded-lg flex-shrink-0"></div>
        <span class="text-xl font-bold" [class.hidden]="isCollapsed()">Automoz</span>
      </div>

      <!-- User Info -->
      <div 
        class="flex items-center gap-3 p-3 bg-base-100 rounded-lg mb-8"
        [class.justify-center]="isCollapsed()">
        <div class="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
        <div [class.hidden]="isCollapsed()">
          <h3 class="font-medium">Jhon Steve</h3>
          <p class="text-sm text-gray-500">jhonsteve&#64;gmail.com</p>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1">
        <!-- Main Menu -->
        <div class="mb-4">
          <h4 class="text-xs font-semibold text-gray-500 mb-2 px-3" [class.text-center]="isCollapsed()">
            {{ isCollapsed() ? 'MENU' : 'MAIN MENU' }}
          </h4>
          <ul class="space-y-1">
            <ng-container *ngFor="let item of mainMenu">
              <li>
                <a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100 cursor-pointer relative group"
                   [class.justify-center]="isCollapsed()"
                   (click)="toggleMenuItem(item)">
                  <ng-icon [name]="item.icon" class="w-5 h-5"></ng-icon>
                  <span [class.hidden]="isCollapsed()">{{ item.label }}</span>
                  <ng-icon 
                    *ngIf="item.children && !isCollapsed()"
                    [name]="item.expanded ? 'heroChevronDown' : 'heroChevronRight'"
                    class="w-4 h-4 ml-auto">
                  </ng-icon>
                  
                  <!-- Tooltip for collapsed state -->
                  <div *ngIf="isCollapsed()" 
                       class="absolute left-full top-0 ml-2 p-2 bg-base-100 rounded-lg shadow-lg hidden group-hover:block whitespace-nowrap z-50">
                    {{ item.label }}
                  </div>
                </a>
                
                <!-- Submenu -->
                <ul *ngIf="item.children && item.expanded && !isCollapsed()" 
                    class="ml-4 mt-1 space-y-1">
                  <li *ngFor="let child of item.children">
                    <a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100">
                      <ng-icon [name]="child.icon" class="w-5 h-5"></ng-icon>
                      {{ child.label }}
                    </a>
                  </li>
                </ul>
              </li>
            </ng-container>
          </ul>
        </div>

        <!-- Preferences -->
        <div>
          <h4 class="text-xs font-semibold text-gray-500 mb-2 px-3" [class.text-center]="isCollapsed()">
            {{ isCollapsed() ? 'PREF' : 'PREFERENCE' }}
          </h4>
          <ul class="space-y-1">
            <li *ngFor="let item of preferenceMenu">
              <a class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100 cursor-pointer relative group"
                 [class.justify-center]="isCollapsed()">
                <ng-icon [name]="item.icon" class="w-5 h-5"></ng-icon>
                <span [class.hidden]="isCollapsed()">{{ item.label }}</span>
                
                <!-- Tooltip for collapsed state -->
                <div *ngIf="isCollapsed()" 
                     class="absolute left-full top-0 ml-2 p-2 bg-base-100 rounded-lg shadow-lg hidden group-hover:block whitespace-nowrap z-50">
                  {{ item.label }}
                </div>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Collapse Toggle -->
      <button 
        class="btn btn-ghost btn-circle self-end hidden lg:flex mt-4"
        (click)="toggleCollapse()">
        <ng-icon 
          [name]="isCollapsed() ? 'heroChevronRight' : 'heroChevronLeft'" 
          class="w-5 h-5">
        </ng-icon>
      </button>
    </div>

    <!-- Overlay for mobile menu -->
    <div 
      *ngIf="isMobileMenuOpen()"
      class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
      (click)="toggleMobileMenu()">
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SidebarComponent {
  isCollapsed = signal(false);
  isMobileMenuOpen = signal(false);

  mainMenu: MenuItem[] = [
    {
      icon: 'heroHome',
      label: 'Dashboard'
    },
    {
      icon: 'heroRocketLaunch',
      label: 'Automate',
      children: [
        {
          icon: 'heroRocketLaunch',
          label: 'Social Media'
        },
        {
          icon: 'heroRocketLaunch',
          label: 'Email Marketing'
        }
      ]
    },
    {
      icon: 'heroCalendarDays',
      label: 'Post Scheduler'
    },
    {
      icon: 'heroUserGroup',
      label: 'Accounts',
      children: [
        {
          icon: 'heroUserGroup',
          label: 'Social Accounts'
        },
        {
          icon: 'heroUserGroup',
          label: 'Team Members'
        }
      ]
    },
    {
      icon: 'heroChartBar',
      label: 'Analytics'
    },
    {
      icon: 'heroCalendarDays',
      label: 'Content Calendar'
    },
    {
      icon: 'heroDocumentText',
      label: 'Reports'
    },
    {
      icon: 'heroUsers',
      label: 'Team Collaboration'
    }
  ];

  preferenceMenu: MenuItem[] = [
    {
      icon: 'heroCog6Tooth',
      label: 'Settings'
    },
    {
      icon: 'heroQuestionMarkCircle',
      label: 'Help Center'
    }
  ];

  toggleCollapse() {
    this.isCollapsed.set(!this.isCollapsed());
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  toggleMenuItem(item: MenuItem) {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }
}