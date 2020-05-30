import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm = new FormGroup({
    first: new FormControl(),
    last: new FormControl(),
    title: new FormControl(),
    email : new FormControl(),
    phone : new FormControl(),
    gender: new FormControl(),
    username : new FormControl(),
    password : new FormControl(),
    dob : new FormControl()
  });

  errorMessage: any;
  formErrors = {
    'first': '',
    'last': '',
    'title': '',
    'email': '',
    'phone': '',
    'gender': '',
    'username' : '',
    'password' : '',
    'dob' : ''
  };
  validationMessages = {
    'first': {
      'required': '*First name is required',
      'maxlength': '*First name cannot be more than 20 characters long.'
    },
    'last': {
      'required': '*Last name is required',
      'maxlength': '*Last name cannot be more than 20 characters long.'
    },
    'title': {
      'required': '*Title is required',
      'maxlength': '*Title cannot be more than 3 characters long.'
    },
    'email': {
      'required': '*Email is required',
      'pattern': '*Invalid email',
      'maxlength': '*Email cannot be more than 25 characters long.'
    },
    "phone": {
      'required': '*Phone number is required',
      'minlength': '*Phone number should be minimum of 6 characters long'
    },
    "gender": {
      'required': '*Gender is required'
    },
    "username":{
      'required': '*User name is required',
    },
    "password":{
      'required': '*Password is required',
    },
    "dob":{
      'required': '*Date of Birth is required',
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createUserForm();
  }

  createUserForm(){
    this.userForm = this.formBuilder.group({
      first: ['',
       [ Validators.required,
        Validators.maxLength(20)]
      ],
      last: ['',
       [ Validators.required,
        Validators.maxLength(20)]
      ],
      title: ['',
       [ Validators.required,
        Validators.maxLength(3)]
      ],
      email: ['',
        [Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
        Validators.maxLength(25)]
      ],
      phone: ['',
       [ Validators.required,
        Validators.minLength(6)]
      ],
      dob: ['',
       [ Validators.required]
      ],
      gender: ['',
       [ Validators.required]
      ],
      username: ['',
       [ Validators.required]
      ],
      password: ['',
       [ Validators.required]
      ]
    });

    this.userForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

      this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
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
    let data = {
      user: {
        username: this.userForm.controls.username.value.toLowerCase(),
        dob: new Date(this.userForm.controls.dob.value).getTime(),
        password: this.userForm.controls.password.value,
        gender: this.userForm.controls.gender.value.toLowerCase(),
        phone: this.userForm.controls.phone.value,
        email: this.userForm.controls.email.value.toLowerCase(),
        name: {
          title: this.userForm.controls.title.value.toLowerCase(),
          first: this.userForm.controls.first.value.toLowerCase(),
          last: this.userForm.controls.last.value.toLowerCase()
        },
      }
    }
    this.updateUserList(data);
    this.router.navigate(['home'])
  }

  updateUserList(data){
    let userList = JSON.parse(localStorage.getItem('userData'));
    userList.push(data);
    localStorage.setItem('userData', JSON.stringify(userList));
  }

}
