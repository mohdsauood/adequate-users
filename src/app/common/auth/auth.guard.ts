import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '../service/local-storage/local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  canActivate(): boolean {
    const currentUser = this.localStorageService.getUserFromLocalStorage();
    if (!currentUser) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}
