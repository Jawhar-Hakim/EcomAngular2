import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  getAdminStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin`);
  }

  getSellerStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/seller`);
  }

  getCustomerStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/customer`);
  }
}
