export interface CompanySignUpDto {
  arabicName: string;
  englishName: string;
  email: string;
  phoneNumber?: string;
  websiteUrl?: string;
  logo?: File;
}
