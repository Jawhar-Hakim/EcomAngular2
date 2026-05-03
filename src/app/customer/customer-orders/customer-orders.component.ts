import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {
  orders: any[] = [];
  loading = true;
  displayedColumns: string[] = ['orderNumber', 'date', 'total', 'status', 'actions'];

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getMyOrders().subscribe({
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

  cancelOrder(id: number): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancelOrder(id).subscribe({
        next: () => {
          this.snackBar.open('Order cancelled', 'Close', { duration: 2000 });
          this.loadOrders();
        },
        error: (err) => {
          console.error('Error cancelling order', err);
          this.snackBar.open(err.error?.message || 'Error cancelling order', 'Close', { duration: 3000 });
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
