import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { API } from '../constants/API';
import { from, map, Observable, tap } from 'rxjs';
import { StorageService } from '../utils/storage.service';
import { jwtDecode } from 'jwt-decode';

export interface ApiResponse<T = any> {
  result: T;
  statusCode: HttpStatusCode;
}
export interface LoginResponse {
  userName: string;
  access_token: string;
}
interface DecodedToken {
  idUser: number;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = `${API}/auth`;
  private userId: string | null = null;
  constructor(private storage: StorageService, private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<ApiResponse<LoginResponse>> {
    return this.http
      .post<ApiResponse<LoginResponse>>(`${this.API_URL}/login`, {
        email,
        password,
      })
      .pipe(
        tap((value) => {
          if (value.statusCode === HttpStatusCode.Ok) {
            this.setUserinfo(value.result);
          }
        })
      );
  }
  setUserinfo(userinfo: LoginResponse) {
    this.storage.set('auth.token', userinfo.access_token);
    this.storage.set('auth.user', userinfo.userName);
  }
  logout() {
    this.storage.clear();
    this.router.navigate(['auth/login']);
  }
  getUserName(): Observable<string> {
    return from(this.storage.get('auth.user'));
  }
  isLogged() {
    return from(this.storage.get('auth.token')).pipe(map((value) => !!value));
  }
  getToken(): Observable<string | null> {
    return from(this.storage.get('auth.token'));
  }
  getIdUserFromToken(): Observable<number | null> {
    return this.getToken().pipe(
      map((token) => {
        if (!token) return null; // Handle the case when the token is null
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.idUser;
      })
    );
  }
}
// getIdUser(): number | null {
//   const token = this.getToken();
//   if (token) {
//     const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
//     return payload.idUser;
//   }
//   return null;
// }
// isTokenExpired(): boolean {
//   const token = this.getToken();
//   if (token) {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     const expiry = payload.exp * 1000; // Convert to milliseconds
//     return Date.now() > expiry;
//   }
//   return true;
// }
