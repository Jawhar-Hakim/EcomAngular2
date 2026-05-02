import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/Services/user.service';
import { User } from '../../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'role', 'status', 'actions'];
  loading = true;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading users', err);
        this.snackBar.open('Error loading users', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  toggleStatus(user: User): void {
    const action = user.active ? this.userService.deactivateUser(user.id) : this.userService.activateUser(user.id);
    
    action.subscribe({
      next: (updatedUser) => {
        user.active = updatedUser.active;
        this.snackBar.open(`User ${user.active ? 'activated' : 'deactivated'} successfully`, 'Close', { duration: 2000 });
      },
      error: (err) => {
        console.error('Error toggling user status', err);
        this.snackBar.open('Error updating user status', 'Close', { duration: 3000 });
      }
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
          this.snackBar.open('User deleted successfully', 'Close', { duration: 2000 });
        },
        error: (err) => {
          console.error('Error deleting user', err);
          this.snackBar.open('Error deleting user', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
