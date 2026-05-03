import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { map, shareReplay, startWith, switchMap } from 'rxjs';
import { Role } from '../../../models/user.model';
import { CartService } from 'src/Services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAdmin$ = this.authService.currentUser.pipe(map(user => user?.role === Role.ADMIN));
  isSeller$ = this.authService.currentUser.pipe(map(user => user?.role === Role.SELLER));
  isCustomer$ = this.authService.currentUser.pipe(map(user => user?.role === Role.CUSTOMER));

  cartItemCount$ = this.authService.currentUser.pipe(
    switchMap(user => {
      if (user?.role === Role.CUSTOMER) {
        // Initial load
        this.cartService.getCart().subscribe();
        // Listen to updates
        return this.cartService.cart$.pipe(
          map(cart => cart?.items?.length || 0),
          startWith(0)
        );
      }
      this.cartService.clearCart();
      return [0];
    }),
    shareReplay(1)
  );

  constructor(public authService: AuthService, private cartService: CartService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
