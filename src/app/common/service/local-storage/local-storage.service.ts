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

  getUserFromLocalStorage(key: string) {
    this.currentUser = localStorage.getItem(key) as string;
    return JSON.parse(this.currentUser);
  }

  deleteCurrentUserFromLocalStorage() {
    localStorage.removeItem('currentUser');
  }
}
