import { Injectable } from '@angular/core';
import * as credentials from '../common/credentials.json';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  validateCredentials(data){
    let isValid
    (data.username === credentials.username && data.password === credentials.password)? isValid =  true : isValid = false;
    return isValid;
  }
}
