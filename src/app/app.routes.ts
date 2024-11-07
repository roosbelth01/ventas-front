import { Routes } from '@angular/router';
import { AppLayoutComponent } from './shared/components/app-layout/app-layout.component';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    data: { breadcrumb: 'Home' },
    children: [
      { path: '', data: { breadcrumb: 'Banking Dashboard' }, component: DashboardComponent },
      { path: 'dashboard', data: { breadcrumb: 'Banking Dashboard 1234' }, component: DashboardComponent },
      /*{ path: 'uikit', data: { breadcrumb: 'UI Kit' }, loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
      { path: 'utilities', data: { breadcrumb: 'Utilities' }, loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
      { path: 'pages', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
      { path: 'profile', data: { breadcrumb: 'User Management' }, loadChildren: () => import('./demo/components/profile/profile.module').then(m => m.ProfileModule) },
      { path: 'documentation', data: { breadcrumb: 'Documentation' }, loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
      { path: 'blocks', data: { breadcrumb: 'Prime Blocks' }, loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
      { path: 'ecommerce', data: { breadcrumb: 'E-Commerce' }, loadChildren: () => import('./demo/components/ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
      { path: 'apps', data: { breadcrumb: 'Apps' }, loadChildren: () => import('./demo/components/apps/apps.module').then(m => m.AppsModule) }*/
    ]
  },
  {
    path: 'auth',
    data: { breadcrumb: 'Auth' },
    children: [
      //{ path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
      //{ path: 'access', loadChildren: () => import('./accessdenied/accessdenied.module').then(m => m.AccessdeniedModule) },
      { path: 'login', data: {},component: LoginComponent },
      //{ path: 'forgotpassword', loadChildren: () => import('./forgotpassword/forgotpassword.module').then(m => m.ForgotPasswordModule) },
      //{ path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
      //{ path: 'newpassword', loadChildren: () => import('./newpassword/newpassword.module').then(m => m.NewPasswordModule) },
      //{ path: 'verification', loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule) },
      //{ path: 'lockscreen', loadChildren: () => import('./lockscreen/lockscreen.module').then(m => m.LockScreenModule) },
      //{ path: '**', redirectTo: '/notfound' }
    ]
  }
  /*{path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
 { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
 { path: '**', redirectTo: '/notfound' }*/
];
