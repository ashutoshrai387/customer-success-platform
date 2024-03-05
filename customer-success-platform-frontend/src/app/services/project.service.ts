// project.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'https://localhost:44347/api/app/project';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<{totalCount:number,items:any[]}> {
    return this.http.get<{totalCount:number,items:any[]}>(this.apiUrl);
  }

  addProject(project: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, project);
  }

  updateProject(id: number, project: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
