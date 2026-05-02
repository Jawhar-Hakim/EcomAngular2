import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.css']
})
export class SellerOrdersComponent implements OnInit {
  orders: any[] = [];
  loading = true;
  displayedColumns: string[] = ['orderNumber', 'customer', 'date', 'total', 'status', 'actions'];

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getSellerOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading orders', err);
        this.snackBar.open('Error loading orders', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  confirmOrder(id: number): void {
    this.orderService.updateOrderStatus(id, 'CONFIRMED').subscribe({
      next: () => {
        this.snackBar.open('Order confirmed', 'Close', { duration: 2000 });
        this.loadOrders();
      },
      error: (err) => {
        console.error('Error confirming order', err);
        this.snackBar.open('Error confirming order', 'Close', { duration: 3000 });
      }
    });
  }

  rejectOrder(id: number): void {
    if (confirm('Are you sure you want to reject this order?')) {
      this.orderService.updateOrderStatus(id, 'CANCELLED').subscribe({
        next: () => {
          this.snackBar.open('Order rejected', 'Close', { duration: 2000 });
          this.loadOrders();
        },
        error: (err) => {
          console.error('Error rejecting order', err);
          this.snackBar.open('Error rejecting order', 'Close', { duration: 3000 });
        }
      });
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'PENDING': return 'accent';
      case 'CONFIRMED': return 'primary';
      case 'SHIPPED': return 'primary';
      case 'DELIVERED': return 'primary';
      case 'CANCELLED': return 'warn';
      default: return '';
    }
  }
}
