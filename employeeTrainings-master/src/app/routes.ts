import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent/* , canActivate: [AuthGuard] */ },
    { path: 'signup', component: SignUpComponent/* , canActivate: [AuthGuard] */ },
    { path: 'profile', component: ProfileComponent/* , canActivate: [AuthGuard] */ },

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: LoginComponent },

];