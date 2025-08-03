import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanySignUpDto } from '../dtos/company-sign-up.dto';
import { Observable } from 'rxjs';
import { VerifyOtpDto } from '../dtos/verify-otp.dto';
import { SetPasswordDto } from '../dtos/set-password.dto';
import { AuthResultDto } from '../dtos/auth-result.dto';
import { LoginDto } from '../dtos/login.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7187/api/auth';

  constructor(private http: HttpClient) {}

  Companysignup(dto: CompanySignUpDto): Observable<{ message: string }> {
    const formData = this.convertToFormData(dto);
    console.log(dto);
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/CompanySignUp`,
      formData
    );
  }

  verifyOtp(dto: VerifyOtpDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/VerifyOtp`, dto);
  }

  setPassword(dto: SetPasswordDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/setPassword`,
      dto
    );
  }

  getOtp(email: string): Observable<{ otp: string }> {
    const params = new HttpParams().set('email', email);
    return this.http.get<{ otp: string }>(`${this.apiUrl}/GetOtp`, { params });
  }

  login(dto: LoginDto): Observable<AuthResultDto> {
    return this.http.post<AuthResultDto>(`${this.apiUrl}/login`, dto);
  }

  saveAuthData(authResult: AuthResultDto): void {
    localStorage.setItem('token', authResult.jwtToken);
    localStorage.setItem('userName', authResult.name);
    localStorage.setItem('role', authResult.role);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
  }

  // Helper method to convert the sign-up DTO into FormData
  private convertToFormData(dto: CompanySignUpDto): FormData {
    const formData = new FormData();
    formData.append('arabicName', dto.arabicName);
    formData.append('englishName', dto.englishName);
    if (dto.phoneNumber) formData.append('phoneNumber', dto.phoneNumber);
    if (dto.websiteUrl) formData.append('websiteUrl', dto.websiteUrl);
    if (dto.logo) formData.append('Logo', dto.logo);
    formData.append('email', dto.email);
    return formData;
  }
}
