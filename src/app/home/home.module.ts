import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

const routes: Routes = [
  { 
    path: '', 
    component: UserListComponent, 
  },
  { 
    path: 'user', 
    component: CreateUserComponent 
  }
];

@NgModule({
  declarations: [UserListComponent, CreateUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule
  ]
})
export class HomeModule { }
