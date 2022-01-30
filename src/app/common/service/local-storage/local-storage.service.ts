import { Injectable } from '@angular/core';
import { User } from 'src/app/modules/authentication/model/user/users.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  currentUser = '';
  constructor() {}

  setUserInLocalStorage(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUserFromLocalStorage() {
    this.currentUser = localStorage.getItem('currentUser') as string;
    return JSON.parse(this.currentUser);
  }

  deleteCurrentUserFromLocalStorage() {
    localStorage.removeItem('currentUser');
  }
}
