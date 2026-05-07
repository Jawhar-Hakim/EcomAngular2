import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://springboot-backend-1-zfa4.onrender.com/api/products';
  private hostUrl = 'https://springboot-backend-1-zfa4.onrender.com';

  constructor(private http: HttpClient) {}

  getImageUrl(imagePath: string): string {
    if (!imagePath) return 'assets/placeholder.png';
    if (imagePath.startsWith('http')) return imagePath;
    return `${this.hostUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  }

  getAllProducts(params: any = {}): Observable<any> {
    return this.http.get(this.baseUrl, { params });
  }

  getMyProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/my-products`);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(this.baseUrl, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  uploadImage(file: File): Observable<{url: string}> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{url: string}>(`${this.baseUrl}/upload-image`, formData);
  }
}
