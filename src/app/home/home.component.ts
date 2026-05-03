import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/Services/auth.service';
import { DashboardService } from '../Services/dashboard.service';
import { Role, User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User | null = null;
  stats: any = null;
  loading = true;

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(u => {
      this.user = u;
      if (u) {
        this.loadStats(u);
      } else {
        this.loading = false;
      }
    });
  }

  loadStats(user: User): void {
    this.loading = true;
    let statsObservable;

    if (user.role === Role.ADMIN) {
      statsObservable = this.dashboardService.getAdminStats();
    } else if (user.role === Role.SELLER) {
      statsObservable = this.dashboardService.getSellerStats();
    } else if (user.role === Role.CUSTOMER) {
      statsObservable = this.dashboardService.getCustomerStats();
    }

    if (statsObservable) {
      statsObservable.subscribe({
        next: (data) => {
          this.stats = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching dashboard stats', err);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  get isAdmin(): boolean { return this.user?.role === Role.ADMIN; }
  get isSeller(): boolean { return this.user?.role === Role.SELLER; }
  get isCustomer(): boolean { return this.user?.role === Role.CUSTOMER; }
}
