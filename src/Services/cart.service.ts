import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080/api/cart';
  private cartSubject = new BehaviorSubject<any>(null);
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(this.baseUrl).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/items`, { productId, quantity }).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  removeFromCart(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/items/${cartItemId}`).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  applyCoupon(couponCode: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/coupon?couponCode=${couponCode}`, {}).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  removeCoupon(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/coupon`).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  clearCart() {
    this.cartSubject.next(null);
  }
}
