import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VerifyOtpDto } from '../../../core/dtos/verify-otp.dto';

@Component({
  selector: 'app-verify-otp',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.css',
})
export class VerifyOtp implements OnInit {
  form!: FormGroup;
  email: string = '';
  otp: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
      this.form = this.fb.group({
        otp: ['', Validators.required],
      });
    });

    this.getOtp();
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const dto: VerifyOtpDto = {
      email: this.email,
      otp: this.form.value.otp,
    };

    this.authService.verifyOtp(dto).subscribe({
      next: (res) => {
        alert(res.message);
        this.router.navigate(['/set-password'], {
          queryParams: { email: this.email },
        });
      },
      error: (err) => {
        alert(err.error?.message || 'حدث خطأ أثناء التحقق');
      },
    });
  }

  getOtp() {
    this.authService.getOtp(this.email).subscribe({
      next: (res) => {
        this.otp = res.otp;
      },
      error: (err) => {
        alert(err.error?.message || 'حدث خطأ أثناء التحقق');
      },
    });
  }
}
