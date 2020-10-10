import { AuthService } from './../auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  errorText: string;
  constructor(private toastr: ToastrService, private service: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.errorText = ''
    this.loginForm = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  validateLogin() {
    if(this.loginForm.valid) {
      this.service.validateLogin(this.loginForm.value).subscribe( result => {
        this.errorText = result.message;

      switch (result.role) {
        
        case 'ADMIN': {
                this.route.navigate(['/admin'])
                break;
            }
        case 'CCD': {
                this.route.navigate(['/ccd'])
                break;
            }
        default: {
                break;
            }
    }
      }, error => {
        this.errorText = error.error.message;
      })
    } else {
      this.toastr.error('Please enter valid inputs.')
    }
  }

}
