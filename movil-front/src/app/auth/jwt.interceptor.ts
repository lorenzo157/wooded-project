// src/core/auth/jwt.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  // Intercept outgoing HTTP requests
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken(); // Get token from AuthService

    // If token exists, clone the request and add the Authorization header
    let modifiedReq = req;
    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Pass the modified request to the next handler and catch errors
    return next.handle(modifiedReq).pipe(
      catchError((err) => {
        // If unauthorized (401), redirect to login page
        if (err.status === 401) {
          this.authService.logout();  // Clear token and redirect to login
          this.router.navigate(['/login']);
        }
        return throwError(err); // Rethrow error for other handlers
      })
    );
  }
}
