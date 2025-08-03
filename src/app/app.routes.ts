import { Routes } from '@angular/router';
import { CompanySignUp } from './features/auth/company-sign-up/company-sign-up';
import { VerifyOtp } from './features/auth/verify-otp/verify-otp';
import { SetPassword } from './features/auth/set-password/set-password';
import { Login } from './features/auth/login/login';
import { Profile } from './features/company/profile/profile';

export const routes: Routes = [
  { path: 'signup', component: CompanySignUp },
  { path: 'verify-otp', component: VerifyOtp },
  { path: 'set-password', component: SetPassword },
  { path: 'login', component: Login },
  { path: 'company-profile', component: Profile },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
