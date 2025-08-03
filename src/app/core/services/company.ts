import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyDto } from '../dtos/company.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly apiUrl = 'https://localhost:7187/api/Companies';

  constructor(private http: HttpClient) {}

  getMyCompany(): Observable<CompanyDto> {
    return this.http.get<CompanyDto>(`${this.apiUrl}/my`);
  }
}
