import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardHeaderComponent } from "./dashboard-header.component";
import { DashboardSidebarComponent } from "./dashboard-sidebar.component";

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, DashboardHeaderComponent, DashboardSidebarComponent],
  template: `
    <app-dashboard-header></app-dashboard-header>
    <app-dashboard-sidebar></app-dashboard-sidebar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,

})
export class DashboardComponent {

}
