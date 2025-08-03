import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { SetPasswordDto } from '../../../core/dtos/set-password.dto';

@Component({
  selector: 'app-set-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './set-password.html',
  styleUrl: './set-password.css',
})
export class SetPassword {
  form!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '';

    this.form = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const dto: SetPasswordDto = {
      email: this.email,
      password: this.form.value.password,
    };

    this.authService.setPassword(dto).subscribe({
      next: () => {
        alert('تم تعيين كلمة المرور بنجاح');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('حدث خطأ أثناء تعيين كلمة المرور');
      },
    });
  }
}
