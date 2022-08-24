import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private toastr: ToastrService,private authService: AuthService, private tokenStorage: TokenStorageService , public router :Router) { }
  ngOnInit(): void {
    if (this.tokenStorage.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmit(): void {
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe({
      next: data => {
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.toastr.success("logged in successfully");
        this.router.navigate(['/home']).then(this.reloadPage);

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.toastr.error("logged in failed");

      }
    });

  }
  reloadPage(): void {
    window.location.reload();
  }
}
