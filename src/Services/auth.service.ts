import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, switchMap, catchError, of } from 'rxjs';
import { User, AuthResponse, Role } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private baseUrl = 'https://springboot-backend-1-zfa4.onrender.com/api/auth';

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    let user = null;
    
    if (savedUser && savedUser !== 'undefined') {
      try {
        user = JSON.parse(savedUser);
      } catch (e) {
        console.error('Could not parse user from local storage', e);
        localStorage.removeItem('currentUser');
      }
    }
    
    this.currentUserSubject = new BehaviorSubject<User | null>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      switchMap(response => {
        // backend may return either { accessToken, refreshToken, user } or { token }
        const token = response.accessToken || response.token;
        if (token) {
          localStorage.setItem('accessToken', token);
        }
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }

        // fetch full user profile from backend (/api/auth/me)
        return this.http.get<User>(`${this.baseUrl}/me`).pipe(
          map(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return { accessToken: token, user };
          }),
          catchError(err => {
            // If /me is unavailable or returns 403, fallback to decoding token to produce a minimal user
            const fallbackUser = this.decodeUserFromToken(token);
            localStorage.setItem('currentUser', JSON.stringify(fallbackUser));
            this.currentUserSubject.next(fallbackUser);
            return of({ accessToken: token, user: fallbackUser });
          })
        );
      })
    );
  }

  private decodeUserFromToken(token: string | null): User | null {
    if (!token) return null;
    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const payload = parts[1];
      // base64url -> base64
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const data = JSON.parse(json);
      const email = data.sub || data.email || null;
      const roleClaim = data.role || data.roles || data.authorities || null;
      let role: Role = Role.CUSTOMER;
      if (roleClaim) {
        if (Array.isArray(roleClaim)) role = roleClaim[0] as Role;
        else if (typeof roleClaim === 'string') role = roleClaim as Role;
      }

      if (!email) return null;

      return {
        id: 0,
        email,
        firstName: email.split('@')[0],
        lastName: '',
        role,
        active: true,
        createdAt: Date.now()
      } as User;
    } catch (e) {
      console.error('Failed to decode token', e);
      return null;
    }
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
