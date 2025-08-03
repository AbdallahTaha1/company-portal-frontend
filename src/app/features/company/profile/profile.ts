import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CompanyDto } from '../../../core/dtos/company.dto';
import { CompanyService } from '../../../core/services/company';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  company: CompanyDto | null = null;
  loading = true;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getMyCompany().subscribe({
      next: (res) => {
        this.company = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  get fullLogoUrl(): string {
    return this.company?.logoUrl?.startsWith('http')
      ? this.company.logoUrl
      : `https://localhost:7187/${this.company?.logoUrl}`;
  }
}
