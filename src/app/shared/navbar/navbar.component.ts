import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAdmin$ = this.authService.currentUser.pipe(map(user => user?.role === Role.ADMIN));
  isSeller$ = this.authService.currentUser.pipe(map(user => user?.role === Role.SELLER));
  isCustomer$ = this.authService.currentUser.pipe(map(user => user?.role === Role.CUSTOMER));

  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
