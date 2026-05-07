import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private baseUrl = 'https://springboot-backend-1-zfa4.onrender.com/api/coupons';

  constructor(private http: HttpClient) {}

  getAllCoupons(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createCoupon(coupon: any): Observable<any> {
    return this.http.post(this.baseUrl, coupon);
  }

  updateCoupon(id: number, coupon: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, coupon);
  }

  deleteCoupon(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
