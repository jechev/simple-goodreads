import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {};
  email: string = sessionStorage.getItem('email');

  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.userService
      .login(this.model.email, this.model.password)
      .then((res) => {
        this.userService.saveToken(res);
        this.email = sessionStorage.getItem('email');
        return this.userService.getUserDetails();
      })
      .then((res) => {
        sessionStorage.setItem('userId', res.data[0].id);
        this.alertifyService.success('Logged in successfully');
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
        this.alertifyService.error(
          'Your email or password was incorrect. Please try again!'
        );
      });
  }

  logout() {
    this.userService.logout();
    this.alertifyService.success('Logged out');
    this.router.navigate(['/']);
  }

  loggedIn(): boolean {
    return this.userService.isAuth();
  }
}
