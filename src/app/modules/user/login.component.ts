import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  errorMessage = '';

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() { }

  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
        const userName = loginForm.form.value.userName;
        const password = loginForm.form.value.password;
        this.authService.login(userName, password);

        // Navigate to the Product List page after log in.
    } else {
        this.errorMessage = 'Please enter a user name and password.';
    }
}
  logOut(): void {
    // perform logout logic
    this.router.navigate(['/welcome']);
  }


}
