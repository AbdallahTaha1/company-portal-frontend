export interface AuthResult {
  userId: string;
  name: string;
  email: string;
  role: string;
  jwtToken: string;
  message: string;
  isAuthenticated: boolean;
}
