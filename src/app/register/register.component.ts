import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = { email: '', password: '' };
  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  register(form) {
    if (form.invalid) {
      return;
    }
    this.userService
      .register(this.model.email, this.model.password)
      .then(() => {
        this.alertifyService.success('Registration succesful');
        this.cancel();
      })
      .catch((err) => {
        console.log(err);
        this.alertifyService.error('Register failed! Please try again!');
      });
  }
  cancel() {
    this.router.navigateByUrl('/');
  }
}
