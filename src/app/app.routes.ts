import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/dashboard.component').then((m) => m.DashboardComponent),
        children: [
          {
            path: 'home',
            loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
          }
        ]
      },
    ],
  },
];
