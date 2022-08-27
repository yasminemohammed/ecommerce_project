import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';

  user_token: string = '';

  displayErrors: string[] = [];

  isError: boolean = false;

  constructor(private _AuthService: AuthService, private _Router: Router, private _ToastrService: ToastrService) {
  }

  loginForm: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  })

  login(loginForm:any)
  {
    this._AuthService.login(loginForm.value).subscribe(
      (response)=>
      {
        if (response.success) {
          this.displayErrors = [];
          this.isError = false;

          localStorage.setItem('currentUser', response.data.accessToken);
          localStorage.setItem('user', JSON.stringify(response.data.user));

          this._AuthService.saveUserData();

          let userNmae = this._AuthService.currentUserData.getValue()?.name;
          this._ToastrService.success('Login Successfully', `Welcome ${userNmae}`);
          this._Router.navigate(['/home']);
        }

      },
      (error)=> {
        this.errorMessage = error.error.message;

        if (error.status == 422) {
          this.isError = true;

          let errorsArray = error.error.errors;
          this.displayErrors = [];
          for (var property in errorsArray) {
            this.displayErrors.push(errorsArray[property][0]);
          }
        }


        console.log(error);


      })

  }
  ngOnInit(): void {
  }

}
