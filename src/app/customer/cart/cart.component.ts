import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../Services/cart.service';
import { OrderService } from '../../Services/order.service';
import { AuthService } from '../../../Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any;
  loading = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (data) => {
        this.cart = data;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error loading cart', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId).subscribe({
      next: (data) => {
        this.cart = data;
        this.snackBar.open('Item removed', 'Close', { duration: 2000 });
      },
      error: () => this.snackBar.open('Error removing item', 'Close', { duration: 3000 })
    });
  }

  checkout() {
    const user = this.authService.currentUserValue;
    if (!user) {
      this.snackBar.open('Please login to checkout', 'Close', { duration: 3000 });
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    this.orderService.placeOrder(user.id).subscribe({
      next: (order) => {
        this.snackBar.open(`Order placed successfully! Order No: ${order.orderNumber}`, 'Close', { duration: 5000 });
        this.cart = null; // Clear local cart
        this.loading = false;
        this.router.navigate(['/customer/catalog']); // Or to an order history page
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Error placing order', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  getTotal(): number {
    if (!this.cart || !this.cart.items) return 0;
    return this.cart.items.reduce((acc: number, item: any) => acc + (item.product.price * item.quantity), 0);
  }
}
