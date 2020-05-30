import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUserList(url: string, urlParams?: HttpParams): Observable<any>{
    return this.http.get(url, {params: urlParams});
  }
}
