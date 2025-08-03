import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { LoginDto } from '../../../core/dtos/login.dto';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form: FormGroup;
  showPassword = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const dto = this.form.value as LoginDto;

    this.authService.login(dto).subscribe({
      next: (res) => {
        this.authService.saveAuthData(res);
        this.router.navigate(['/company-profile']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'حدث خطأ أثناء تسجيل الدخول';
      },
    });
  }
}
