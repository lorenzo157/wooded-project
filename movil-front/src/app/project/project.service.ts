import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../constants/API';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly API_URL = `${API}/project`;

  constructor(private http: HttpClient) {}

  findAllAssignedProjectsToUser(idUser: number): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL+`assignedproject/${idUser}`);
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }
}
