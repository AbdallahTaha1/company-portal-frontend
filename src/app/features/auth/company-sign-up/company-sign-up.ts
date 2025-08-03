import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { Router, RouterModule } from '@angular/router';
import { CompanySignUpDto } from '../../../core/dtos/company-sign-up.dto';

@Component({
  selector: 'app-company-sign-up',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './company-sign-up.html',
  styleUrl: './company-sign-up.css',
  standalone: true,
})
export class CompanySignUp {
  signupForm: FormGroup;
  logoFile?: File;
  errorMessage: string = '';
  successMessage: string = '';
  backendErrors: string[] = [];

  logoPreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      arabicName: ['', Validators.required],
      englishName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      websiteUrl: [''],
      logo: [null],
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.logoFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.backendErrors = [];

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      this.errorMessage = 'يرجى ملء الحقول المطلوبة.';
      return;
    }

    const dto = this.signupForm.value as CompanySignUpDto;
    dto.logo = this.logoFile;

    this.authService.Companysignup(dto).subscribe({
      next: (res) => {
        this.successMessage = res.message || 'تم التسجيل بنجاح';
        this.router.navigate(['/verify-otp'], {
          queryParams: { email: this.signupForm.value.email },
        });
      },
      error: (err) => {
        const backend = err?.error;
        if (backend?.errors && typeof backend.errors === 'object') {
          this.backendErrors = Object.values(
            backend.errors as { [key: string]: string[] }
          ).flat();
        } else if (backend?.message) {
          this.backendErrors = [backend.message];
        } else {
          this.backendErrors = ['حدث خطأ أثناء عملية التسجيل.'];
        }
      },
    });
  }

  // Helper to check field errors in the template
  hasError(controlName: string, errorCode: string): boolean {
    const control = this.signupForm.get(controlName);
    return (control?.touched && control?.hasError(errorCode)) || false;
  }
}
