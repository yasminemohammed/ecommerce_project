import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    name: null,
    email: null,
    password: null,
    password_confirm:null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private toastr: ToastrService,private authService: AuthService , private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { name, email, password,password_confirm } = this.form;

    this.authService.register(name, email, password,password_confirm).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.toastr.success("registeration done successfully");
        this.router.navigate(['/login']);


      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.toastr.error("registeration failed");


      }
    });
  }
}
