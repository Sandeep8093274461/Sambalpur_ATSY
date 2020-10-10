import { serverUrl } from './../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  validateLogin(data: object): Observable<any> {
    return this.http.post(`${serverUrl}/login`, data)
  }
}
