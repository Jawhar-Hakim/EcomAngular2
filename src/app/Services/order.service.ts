import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/my`);
  }

  getSellerOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/seller`);
  }

  placeOrder(): Observable<any> {
    return this.http.post(`${this.baseUrl}`, {});
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${orderId}/status?status=${status}`,
      {},
    );
  }

  getOrderStatus(orderId: number): Observable<string> {
    return this.http.get(`${this.baseUrl}/${orderId}/status`, {
      responseType: 'text',
    });
  }

  cancelOrder(orderId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${orderId}/cancel`, {});
  }
}
