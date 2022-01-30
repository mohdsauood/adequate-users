import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from 'src/app/common/service/local-storage/local-storage.service';
import { environment } from 'src/environments/environment';
import { LoginUser, RegisterUser, UserRes } from '../model/user/users.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private avoidInterceptorHttp: HttpClient;
  constructor(
    private handler: HttpBackend,
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.avoidInterceptorHttp = new HttpClient(handler);
  }

  login({ email, password }: LoginUser): Observable<UserRes> {
    return this.avoidInterceptorHttp.post<UserRes>(
      environment.apiUrl + '/authaccount/login',
      {
        email,
        password,
      }
    );
  }

  register({ email, password, name }: RegisterUser): Observable<UserRes> {
    return this.avoidInterceptorHttp.post<UserRes>(
      environment.apiUrl + '/authaccount/registration',
      {
        name,
        email,
        password,
      }
    );
  }

  logout() {
    this.localStorageService.deleteCurrentUserFromLocalStorage();
    return of(null);
  }
}
