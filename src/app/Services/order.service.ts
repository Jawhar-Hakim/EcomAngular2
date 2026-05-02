import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  getSellerOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/seller/all`);
  }

  placeOrder(userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${userId}`, {});
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${orderId}/status?status=${status}`, {});
  }

  cancelOrder(orderId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${orderId}/cancel`, {});
  }
}
