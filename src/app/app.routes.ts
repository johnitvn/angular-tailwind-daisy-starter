import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/components/login/login.component')
          .then(m => m.LoginComponent)
      },
      {
        path: 'verify',
        loadComponent: () => import('./features/auth/components/otp-verification/otp-verification.component')
          .then(m => m.OtpVerificationComponent)
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
    canActivate: [authGuard]
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }
];