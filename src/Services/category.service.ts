import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getCategoryTree(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tree`);
  }

  createCategory(category: any): Observable<any> {
    return this.http.post(this.baseUrl, category);
  }

  updateCategory(id: number, category: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
