import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { API } from '../constants/API';
@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  // Intercept outgoing HTTP requests
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request.url, 'real')
    const regex_create_tree = new RegExp(`${API}/project/\\d+/tree`); 
    if (request.url.match(regex_create_tree) && request.method === 'POST') {
      console.log('regext activado')
      return next.handle(request); // Pass the request without modification
    }
    
    const regex_update_tree = new RegExp(`${API}/project/\\d+/tree/\\d+`); 
    if (request.url.match(regex_update_tree) && request.method === 'PUT') {
      console.log('regext activado')
      return next.handle(request); // Pass the request without modification
    }
    
    return this.authService.getToken().pipe(
      // Use switchMap to wait for the token to be retrieved
      switchMap((token) => {
        console.log('jwtinterceptor is activated and the token is: ', token);
        if (token) {
          // Clone the request and add the Authorization header
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        return next.handle(request);
      })
    );
  }
}


