import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl(),
    password : new FormControl()
  });

  errorMessage: any;
  isCredentialsValid = true;
  formErrors = {
    'userName': '',
    'password': ''
  };
  validationMessages = {
    'userName': {
      'required': '*Username is required'
    },
    'password': {
      'required': '*Password is required'
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      userName: ['',
       [ Validators.required]
      ],
      password: ['',
        [Validators.required]
      ]
    });

    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

      this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && (control.dirty && !control.valid)) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] = messages[key];
        }
      }
    }
  }

  onSubmit(){
    const data = {
      username: this.loginForm.controls.userName.value,
      password: this.loginForm.controls.password.value
    }
    this.isCredentialsValid = this.loginService.validateCredentials(data);
    if(this.isCredentialsValid){
      this.router.navigate(['home'])
    }
  }

}
