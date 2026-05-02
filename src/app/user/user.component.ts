import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/Services/auth.service';
import { User } from 'src/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser;
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
