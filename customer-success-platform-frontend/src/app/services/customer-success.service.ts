import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CustomerSuccessService {

  constructor(private http: HttpClient) { }

  getProjects(apiUrl: string): Observable<{totalCount: number,items: any[]}> {
    return this.http.get<any>(apiUrl);
  }

  // getProjectById(apiUrl: string, id: string): Observable<{totalCount:number,items:any[]}> {
  //   return this.http.get<any>(`${apiUrl}/${id}`);
  // }

  addProject(apiUrl: string, project: any): Observable<any> {
    return this.http.post<any>(apiUrl, project);
  }

  updateProject(apiUrl: string, id: string, project: any): Observable<any> {
    return this.http.put<any>(`${apiUrl}/${id}`, project);
  }

  deleteProject(apiUrl: string, id: string): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/${id}`);
  }
}
