import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyDto } from '../dtos/company.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Company {
  private readonly apiUrl = 'https://localhost:7187/api/Company';

  constructor(private http: HttpClient) {}

  getMyCompany(): Observable<CompanyDto> {
    return this.http.get<CompanyDto>(`${this.apiUrl}/me`);
  }
}
