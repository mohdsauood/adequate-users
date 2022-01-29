import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  login(data: any): Observable<any> {
    return of('');
  }
}
