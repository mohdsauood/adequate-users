import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUser, RegisterUser, UserRes } from '../model/user/users.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login({ email, password }: LoginUser): Observable<UserRes> {
    return this.http.post<UserRes>(environment.apiUrl + '/authaccount/login', {
      email,
      password,
    });
  }

  register({ email, password, name }: RegisterUser): Observable<UserRes> {
    return this.http.post<UserRes>(
      environment.apiUrl + '/authaccount/registration',
      {
        name,
        email,
        password,
      }
    );
  }
}
