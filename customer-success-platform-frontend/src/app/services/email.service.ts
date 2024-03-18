import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'https://localhost:44347/api/EmailNotification';

  constructor(private http: HttpClient) {}

  getStakeholderEmail(): Observable<{totalCount: number,items: any[]}> {
    return this.http.get<any>('https://localhost:44347/api/app/stakeholder');
  }

  sendEmailNotification(email: string, subject: string, content: string): Observable<any> {
    const data = { email, subject, content };
    return this.http.post<any>(this.apiUrl, data);
  }
}