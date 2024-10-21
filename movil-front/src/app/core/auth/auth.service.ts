import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API } from '../../constants/API';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = `${API}/auth`;
  
  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }) {
    this.http.post<{ token: string }>(`${this.API_URL}/login`, credentials)
      .subscribe(response => {
        localStorage.setItem('token', response.token);  // Store JWT in localStorage
        this.router.navigate(['/assignedproject']);  // Navigate to home after login
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getIdUser(): number | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));  // Decode JWT payload
      return payload.idUser;
    }
    return null;
  }
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000;  // Convert to milliseconds
      return Date.now() > expiry;
    }
    return true;
  }
}
