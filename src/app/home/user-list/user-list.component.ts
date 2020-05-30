import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userData: Array<any> = [];
  searchData: Array<any> = [];
  isSearch:Boolean = false;
  constructor(
    private userService : UserService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList(){
    this.userData = this.getUserList();
    if(this.userData.length == 0){
      this.spinner.show();
      this.userService.getUserList('https://randomuser.me/api/0.8/?results=20')
        .subscribe(response => {
          this.saveUserList(response.results);
          this.userData = this.getUserList();
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
        });
    }
  }

  saveUserList(data){
    localStorage.setItem('userData', JSON.stringify(data));
  }

  getUserList(){
    return JSON.parse(localStorage.getItem('userData'));
  }

  searchUser(value){
    if(value.trim().length == 0 ){
      this.searchData = [];
      this.isSearch = false;
    } else {
      this.searchData = this.userData.filter(data => {
        if(data.user.name.first.includes(value.toLowerCase()) || data.user.name.last.includes(value.toLowerCase())){
          return data;
        }
      });
      this.isSearch = true;
    }
  }
}
